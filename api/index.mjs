import express from 'express';
import pg from 'pg';
import cors from 'cors';

const { Pool } = pg;
const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// 1. Get PostgreSQL Connection String from Environment
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("❌ ERROR: DATABASE_URL is not set in environment variables.");
}

// Remove ?sslmode=... from the URL: newer pg versions let it override the ssl option below,
// which breaks Aiven's certificate ("self-signed certificate in certificate chain").
const CONNECTION_STRING = (DATABASE_URL || '').replace(/[?&]sslmode=[^&]*/g, '').replace(/\?$/, '');

const pool = new Pool({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
  max: 3,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 10000
});

// 2. Initialize Database Table
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        data JSONB NOT NULL
      )
    `);
    console.log('✅ PostgreSQL Table Ready');
  } catch (err) {
    console.error('❌ DB Init Error:', err.message);
  }
}
initDB();

// Admin auth (password stored ONLY in Vercel env var ADMIN_PASSWORD)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const isAdmin = (req) => !!ADMIN_PASSWORD && req.get('x-admin-password') === ADMIN_PASSWORD;

app.post('/api/login', (req, res) => {
  if (isAdmin(req)) return res.json({ success: true });
  res.status(401).json({ error: 'Wrong password' });
});

// 3. API Endpoints
app.get('/api/products', async (req, res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  try {
    const result = await pool.query('SELECT data FROM products');
    const products = result.rows.map(row => row.data);
    res.json(products);
  } catch (e) {
    console.error('❌ Fetch Error:', e.message);
    res.status(500).json({ error: 'Failed to fetch from PG' });
  }
});

app.post('/api/products', async (req, res) => {
  if (!isAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const products = req.body;
    if (!Array.isArray(products)) return res.status(400).json({ error: 'Invalid data' });
    
    // Clear and Replace using a Transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query('DELETE FROM products');
      for (const p of products) {
        await client.query('INSERT INTO products (id, data) VALUES ($1, $2)', [p.id, JSON.stringify(p)]);
      }
      await client.query('COMMIT');
      res.json({ success: true });
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('❌ Save Error:', error);
    res.status(500).json({ error: 'Failed to save to PG' });
  }
});

export default app;

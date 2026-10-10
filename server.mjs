import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// 1. DATABASE CONNECTION
// You will get this URL from MongoDB Atlas (Free)
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://admin:ember123@cluster.example.mongodb.net/mapscred";

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to Cloud Database (MongoDB)'))
  .catch(err => console.error('❌ Cloud DB Connection Error:', err));

// 2. PRODUCT SCHEMA
const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  category: String,
  price: Number,
  compareAt: Number,
  image: String,
  badge: String,
  rating: Number,
  reviews: Number,
  tagline: String,
  description: String,
  bullets: [String],
  stock: Number,
  affiliateLink: String
}, { strict: false });

const ProductModel = mongoose.model('Product', productSchema);

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'dist')));

// 3. API ROUTES
app.get('/api/products', async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch from cloud' });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const products = req.body;
    // Clear and Replace (Simple for catalog management)
    await ProductModel.deleteMany({});
    await ProductModel.insertMany(products);
    console.log('✅ Cloud Database Updated via Admin');
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Save Error:', error);
    res.status(500).json({ error: 'Cloud save failed' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Live Store Server running at http://localhost:${PORT}`);
});

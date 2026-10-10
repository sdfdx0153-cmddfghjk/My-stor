import fs from 'fs';
import readline from 'readline';
import { execSync } from 'child_process';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const JSON_PATH = './products.json';

function showMenu() {
  console.log('\n--- MAPSCRED CMD MANAGER ---');
  console.log('[1] List All Products');
  console.log('[2] Update Product Price');
  console.log('[3] Update WED2C Link');
  console.log('[4] Build Site for Hosting');
  console.log('[5] Exit');
  rl.question('\nChoose action: ', handleAction);
}

function handleAction(choice) {
  const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));

  if (choice === '1') {
    console.table(data.map(p => ({ id: p.id, name: p.name, price: p.price, link: p.affiliateLink })));
    showMenu();
  } 
  else if (choice === '2') {
    rl.question('Enter Product ID: ', (id) => {
      rl.question('Enter New Price: ', (price) => {
        const index = data.findIndex(p => p.id === id);
        if (index !== -1) {
          data[index].price = Number(price);
          fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2));
          console.log('✅ Price Updated!');
        } else {
          console.log('❌ Product not found.');
        }
        showMenu();
      });
    });
  }
  else if (choice === '3') {
    rl.question('Enter Product ID: ', (id) => {
      rl.question('Enter New WED2C Link: ', (link) => {
        const index = data.findIndex(p => p.id === id);
        if (index !== -1) {
          data[index].affiliateLink = link;
          fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2));
          console.log('✅ Link Updated!');
        } else {
          console.log('❌ Product not found.');
        }
        showMenu();
      });
    });
  }
  else if (choice === '4') {
    console.log('🚀 Building site... Please wait.');
    try {
      execSync('npm run build', { stdio: 'inherit' });
      console.log('\n✅ BUILD SUCCESSFUL! Check the /dist folder.');
    } catch (e) {
      console.log('❌ Build failed.');
    }
    showMenu();
  }
  else {
    process.exit();
  }
}

showMenu();

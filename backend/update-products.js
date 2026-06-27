const fs = require('fs');

const titles = [
  "Apple iPhone 15 Pro Max",
  "Samsung Galaxy S24 Ultra",
  "Sony WH-1000XM5 Headphones",
  "MacBook Pro 16-inch M3 Max",
  "Dell XPS 15 OLED Laptop",
  "Apple Watch Ultra 2",
  "PlayStation 5 Console",
  "Nike Air Force 1 '07",
  "LG C3 65-inch OLED TV",
  "DJI Mini 4 Pro Drone"
];

const descriptions = [
  "Experience the ultimate smartphone with A17 Pro chip, titanium design, and a 48MP main camera. Capture the world in incredible detail and enjoy all-day battery life.",
  "Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity, productivity and possibility.",
  "Industry-leading noise cancellation. Two processors control 8 microphones for unprecedented noise cancellation. With Auto NC Optimizer, noise canceling is automatically optimized.",
  "Mind-blowing. Head-turning. The most advanced Mac ever built with the M3 Max chip. Enjoy a stunning Liquid Retina XDR display and amazing battery life.",
  "15.6-inch 3.5K OLED touch display, Intel Core i9 processor, NVIDIA RTX 4070 graphics. Built for creators who need desktop-level performance in a laptop.",
  "The most rugged and capable Apple Watch pushes the limits again. Featuring the all-new S9 SiP. A magical new way to use your watch without touching the screen.",
  "Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio.",
  "The radiance lives on in the Nike Air Force 1 '07, the b-ball icon that puts a fresh spin on what you know best: crisp leather, bold colors and the perfect amount of flash.",
  "The LG OLED evo C-Series is powered by the a9 AI Processor Gen6—made exclusively for LG OLED. It delivers beautiful picture and performance.",
  "Mini 4 Pro is our most advanced mini-camera drone to date. It integrates powerful imaging capabilities, omnidirectional obstacle sensing, and ActiveTrack 360°."
];

const slugify = (str) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

const products = JSON.parse(fs.readFileSync('./utils/dummyData/product.json'));

products.forEach((p, i) => {
  p.title = titles[i % titles.length];
  p.slug = slugify(p.title);
  p.description = descriptions[i % descriptions.length];
  
  // We keep the existing p.imageCover and p.images from product.json 
  // since they are already mapped correctly to each product, 
  // rather than randomizing them.
});

fs.writeFileSync('./utils/dummyData/product.json', JSON.stringify(products, null, 2));
console.log('product.json updated successfully with titles, slugs, and descriptions! (Existing images preserved)');

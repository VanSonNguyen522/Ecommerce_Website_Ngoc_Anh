// addProducts.js


const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const products = [
  { 
    name: 'Gạch Đôi', 
    description: 'Gạch đôi chất lượng cao', 
    price: 10000, 
    oldPrice: null, 
    category: 'newest', 
    image: '/assets/images/Product_Demo/Gach_DOi.jpg', 
    isNew: true, 
    isOnSale: false, 
    status: 'newest' 
  },
  { 
    name: 'Gạch Đơn', 
    description: 'Gạch đơn thích hợp cho nhiều công trình', 
    price: 7000, 
    oldPrice: 8000, 
    category: 'trending', 
    image: '/assets/images/Product_Demo/Gach_Don.jpg', 
    isNew: false, 
    isOnSale: true, 
    status: 'trending' 
  },
  { 
    name: 'Cát xây dựng', 
    description: 'Cát xây dựng chất lượng cho công trình', 
    price: 20000, 
    oldPrice: null, 
    category: 'best-sellers', 
    image: '/assets/images/Product_Demo/Cat_Xay_Dung.jpg', 
    isNew: true, 
    isOnSale: false, 
    status: 'best-sellers' 
  },
  { 
    name: 'Coffa', 
    description: 'Coffa bê tông cho công trình', 
    price: 300000, 
    oldPrice: null, 
    category: 'featured', 
    image: '/assets/images/Product_Demo/Coffa.jpg', 
    isNew: false, 
    isOnSale: false, 
    status: 'featured' 
  },
  { 
    name: 'Ván ép', 
    description: 'Ván ép chất lượng cao cho nhiều ứng dụng', 
    price: 150000, 
    oldPrice: 160000, 
    category: 'trending', 
    image: '/assets/images/Product_Demo/Van_ep.jpg', 
    isNew: false, 
    isOnSale: true, 
    status: 'trending' 
  },
  { 
    name: 'Tôn màu', 
    description: 'Tôn màu chất lượng cho mái nhà', 
    price: 110000, 
    oldPrice: 125000, 
    category: 'best-sellers', 
    image: '/assets/images/Product_Demo/Ton_Mau.jpg', 
    isNew: false, 
    isOnSale: true, 
    status: 'best-sellers' 
  },
  { 
    name: 'Tôn nhựa', 
    description: 'Tôn nhựa nhẹ, dễ lắp đặt', 
    price: 85000, 
    oldPrice: 90000, 
    category: 'featured', 
    image: '/assets/images/Product_Demo/Ton_Nhua.jpg', 
    isNew: false, 
    isOnSale: true, 
    status: 'featured' 
  },
  { 
    name: 'Lưới B40', 
    description: 'Lưới B40 dùng trong xây dựng', 
    price: 65000, 
    oldPrice: 70000, 
    category: 'newest', 
    image: '/assets/images/Product_Demo/Luoi_B40.jpg', 
    isNew: true, 
    isOnSale: false, 
    status: 'newest' 
  },
  { 
    name: 'Sắt 3x6', 
    description: 'Sắt 3x6 chất lượng cho công trình', 
    price: 330000, 
    oldPrice: 310000, 
    category: 'best-sellers', 
    image: '/assets/images/Product_Demo/Sat_3x6.jpg', 
    isNew: false, 
    isOnSale: true, 
    status: 'best-sellers' 
  },
  { 
    name: 'Xi măng', 
    description: 'Xi măng cho xây dựng bền vững', 
    price: 90000, 
    oldPrice: null, 
    category: 'trending', 
    image: '/assets/images/Product_Demo/Xi_mang.jpg', 
    isNew: true, 
    isOnSale: false, 
    status: 'trending' 
  },
];

async function main() {
  for (const product of products) {
    const createdProduct = await prisma.product.create({
      data: product,
    });
    console.log('Created product:', createdProduct);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

"use client";


import React, { useState } from 'react';
import ProductCard from './Product_Card';

const products = [
  { id: 1, image: '/assets/images/Product_Demo/Gach_DOi.jpg', name: 'Gạch Đôi', price: '10,000 vnd', category: 'newest' },
  { id: 2, image: '/assets/images/Product_Demo/Gach_Don.jpg', name: 'Gạch Đơn', price: '7,000 vnd', oldPrice: '8,000 vnd', category: 'trending' },
  { id: 3, image: '/assets/images/Product_Demo/Cat_Xay_Dung.jpg', name: 'Cát xây dựng', price: '20,000 vnd', category: 'best-sellers' },
  { id: 4, image: '/assets/images/Product_Demo/Coffa.jpg', name: 'Coffa', price: '300,000 vnd', category: 'featured' },
  { id: 5, image: '/assets/images/Product_Demo/Van_ep.jpg', name: 'Ván ép', price: '150,000 vnd', oldPrice: '160,000 vnd', category: 'trending' },
  { id: 6, image: '/assets/images/Product_Demo/Ton_Mau.jpg', name: 'Tôn màu', price: '110,000 vnd', oldPrice: '125,000 vnd', category: 'best-sellers' },
  { id: 7, image: '/assets/images/Product_Demo/Ton_Nhua.jpg', name: 'Tôn nhựa', price: '85,000 vnd', oldPrice: '90,000 vnd', category: 'featured' },
  { id: 8, image: '/assets/images/Product_Demo/Luoi_B40.jpg', name: 'Lưới B40', price: '65,000 vnd', oldPrice: '70,000 vnd', category: 'newest' },
  // Add more products as needed
];

const Product_Demo = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="bg-white px-4">
      <h2 className="text-2xl font-bold text-center mb-8">Sản Phẩm Của Chúng Tôi</h2>
      <div className="flex justify-center mb-4 py-6">
        <nav className="flex space-x-4">
          <button onClick={(e) => { e.preventDefault(); handleCategoryChange('all'); }} className={`text-gray-500 hover:text-gray-900 ${selectedCategory === 'all' ? 'font-bold' : ''}`}>ALL</button>
          <button onClick={(e) => { e.preventDefault(); handleCategoryChange('newest'); }} className={`text-gray-500 hover:text-gray-900 ${selectedCategory === 'newest' ? 'font-bold' : ''}`}>NEWEST</button>
          <button onClick={(e) => { e.preventDefault(); handleCategoryChange('trending'); }} className={`text-gray-500 hover:text-gray-900 ${selectedCategory === 'trending' ? 'font-bold' : ''}`}>TRENDING</button>
          <button onClick={(e) => { e.preventDefault(); handleCategoryChange('best-sellers'); }} className={`text-gray-500 hover:text-gray-900 ${selectedCategory === 'best-sellers' ? 'font-bold' : ''}`}>BEST SELLERS</button>
          <button onClick={(e) => { e.preventDefault(); handleCategoryChange('featured'); }} className={`text-gray-500 hover:text-gray-900 ${selectedCategory === 'featured' ? 'font-bold' : ''}`}>FEATURED</button>
        </nav>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-18 px-24" >
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            oldPrice={product.oldPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default Product_Demo;

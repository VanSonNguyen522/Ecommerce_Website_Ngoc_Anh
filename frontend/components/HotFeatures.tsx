"use client";

import React, { useRef } from 'react';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  price: string;
  salePrice?: string;
  image: string;
  isNew: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: 'I 100',
    price: '730,000 vnd',
    image: "/assets/images/Hot_Features/I_100.jpg",
    isNew: true,
  },
  {
    id: 2,
    name: 'Phi 12',
    price: '70,000 vnd',
    salePrice: '65,000 vnd',
    image: "/assets/images/Hot_Features/Phi_12.jpg",
    isNew: false,
  },
  {
    id: 3,
    name: 'Ốc vít',
    price: '1,000 vnd',
    image: "/assets/images/Hot_Features/Oc_vit.jpg",
    isNew: true,
  },
  {
    id: 4,
    name: 'Bảng mã',
    price: '12,000 vnd',
    image: '/assets/images/Hot_Features/Bang_ma.jpg',
    isNew: false,
  },
  {
    id: 5,
    name: 'Mâm cầu thang',
    price: '200,000 vnd',
    image: '/assets/images/Hot_Features/mam_cau_thang.jpg',
    isNew: true,
  },
  {
    id: 6,
    name: 'Giàn giáo',
    price: '480,000 vnd',
    salePrice: '440,000 vnd',
    image: '/assets/images/Hot_Features/Gian_giao.png',
    isNew: false,
  },
  {
    id: 7,
    name: 'Sắt 5x10',
    price: '520,000 vnd',
    salePrice: '490,000 vnd',
    image: '/assets/images/Hot_Features/Sat_5x10.jpg',
    isNew: false,
  },
  {
    id: 8,
    name: 'Sắt 4x8',
    price: '400,000 vnd',
    salePrice: '380,000 vnd',
    image: '/assets/images/Hot_Features/Sat_4x8.jpg',
    isNew: false,
  },
  {
    id: 9,
    name: 'Sắt 3x6',
    price: '330,000 vnd',
    salePrice: '310,000 vnd',
    image: '/assets/images/Hot_Features/Sat_3x6.webp',
    isNew: false,
  }
];

const ProductCard: React.FC<Product> = ({ name, price, salePrice, image, isNew }) => {
  return (
    <div className="relative w-72 h-80 p-6 bg-white rounded-lg shadow-lg text-left flex-shrink-0">
      {isNew && <span className="absolute top-2 left-2 px-3 py-1 bg-green-500 text-white text-xs rounded">New</span>}
      {salePrice && <span className="absolute top-2 left-2 px-3 py-1 bg-red-500 text-white text-xs rounded">Sale</span>}
      <div className="flex justify-center items-center h-36 mb-5">
        <Image src={image} alt={name} width={200} height={200} className="rounded-lg object-cover py-2 p-4" />
      </div>
      <div className="flex justify-between items-center mb-2 py-4 ">
        <h3 className="text-lg font-bold">{name}</h3>
        <button className="bg-gray-200 p-2 rounded-full hover:scale-110 transition-transforms duration-200 hover:bg-green-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"  // Corrected camelCase property
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61l1.38-7.38H6"></path>
        </svg>
        </button>
      </div>
      <p className="text-lg font-semibold">
        {salePrice ? (
          <>
            <span className="text-red-500 line-through mr-2">{price}</span> 
            <span className="text-black">{salePrice}</span>
          </>
        ) : (
          price
        )}
      </p>
    </div>
  );
};

const HotFeatures: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -320 : 320,  // Scroll by one card width
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="p-16 bg-white">
      <h1 className="font-bold text-2xl text-left p-3 px-20">Hàng Hóa Nổi Bật</h1>
      <div className="relative flex items-center justify-center py-10">
        <button
          className="absolute left-0 bg-gray-200 p-2 rounded-full z-10"
          onClick={() => scroll('left')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div
          ref={scrollRef}
          className="flex overflow-x-scroll scroll-smooth scrollbar-hide space-x-5"
          style={{ width: '1200px' }} // Fixed width for 4 cards
        >
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        <button
          className="absolute right-0 bg-gray-200 p-2 rounded-full z-10"
          onClick={() => scroll('right')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HotFeatures;

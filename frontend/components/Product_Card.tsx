import Image from 'next/image';
import React from 'react';

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  oldPrice?: string;
  isNew?: boolean;
  isOnSale?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, name, price, oldPrice, isNew, isOnSale }) => {
  return (
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden group p-30">
      <div className="relative w-full h-60 overflow-hidden">
        <Image src={image} alt={name} layout="fill" objectFit="cover" className="group-hover:scale-110 transition-transform duration-200 ease-in-out" />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2 py-4 ">
            <h3 className="text-lg font-medium text-gray-700">{name}</h3>
            <button className="bg-gray-200 p-2 rounded-full hover:bg-green-200 hover:scale-110 transition-transforms duration-200">
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
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900">{price}</span>
          {oldPrice && <span className="text-sm line-through text-gray-500">{oldPrice}</span>}
        </div>
      </div>
      {isNew && <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">New</span>}
      {isOnSale && <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">Sale</span>}
    </div>
  );
};

export default ProductCard;

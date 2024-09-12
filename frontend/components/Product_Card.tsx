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
        <h3 className="text-sm font-medium text-gray-700">{name}</h3>
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

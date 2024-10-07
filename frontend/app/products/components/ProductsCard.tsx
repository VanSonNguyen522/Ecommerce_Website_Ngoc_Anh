"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCartIcon } from '@heroicons/react/outline';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number | null;
  category: string;
  image?: string | null;
  isNew?: boolean;
  isOnSale?: boolean;
  status?: string | null;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const router = useRouter();

  const handleProductClick = () => {
    router.push(`/products/${product.id}`); // Điều hướng đến trang chi tiết sản phẩm
  };

  const handleAddToCartClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent the card click from also triggering
    onAddToCart && onAddToCart(product); // Call onAddToCart if it's provided
  };

  return (
    <div
      onClick={handleProductClick}
      className="border border-gray-200 rounded-md shadow-md p-4 hover:shadow-lg transition-shadow flex flex-col h-full cursor-pointer"
    >
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover mb-4 rounded-md"
        />
      )}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <div
          onClick={handleAddToCartClick}
          className="relative w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-green-600 transition duration-200 cursor-pointer"
        >
          <ShoppingCartIcon className="h-5 w-5 text-gray-500 hover:text-white transition duration-200" aria-hidden="true" />
        </div>
      </div>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-xl font-bold mb-2">${product.price.toFixed(2)}</p>
      {product.oldPrice && (
        <p className="text-sm line-through text-gray-500">
          Old Price: ${product.oldPrice.toFixed(2)}
        </p>
      )}
      <div className="flex items-center mt-2">
        {product.isNew && (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
            New
          </span>
        )}
        {product.isOnSale && (
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full ml-2">
            On Sale
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

import React from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCartIcon } from '@heroicons/react/outline';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

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

const Product_Card: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleProductClick = () => {
    router.push(`/products/${product.id}`);
  };

  const handleAddToCartClick = async (event: React.MouseEvent) => {
    event.stopPropagation();

    if (!userId) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          productId: product.id,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      toast.success(`${product.name} added to cart`);
      onAddToCart && onAddToCart(product);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  return (
    <div
      onClick={handleProductClick}
      className="border border-gray-200 rounded-md shadow-md p-4 hover:shadow-lg transition-shadow flex flex-col h-full cursor-pointer"
    >
      {product.image && (
        <div className="relative w-full h-60 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-110 transition-transform duration-200 ease-in-out"
          />
        </div>
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

export default Product_Card;

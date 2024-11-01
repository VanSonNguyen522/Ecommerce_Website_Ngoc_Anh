"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCartIcon } from '@heroicons/react/outline';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image?: string;
  isNew?: boolean;
  isOnSale?: boolean;
}

const ProductCard: React.FC<Product> = ({ id, name, price, oldPrice, image, isNew, isOnSale }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the cart button
    
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
          productId: id,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      toast.success(`${name} added to cart`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  return (
    <Link href={`/products/${id}`} className="block">
      <div className="relative w-72 h-80 p-6 bg-white border-solid border-2 rounded-lg shadow-lg text-left flex-shrink-0 hover:shadow-xl transition-shadow duration-300">
        {isNew && <span className="absolute top-2 left-2 px-3 py-1 bg-green-500 text-white text-xs rounded">New</span>}
        {isOnSale && <span className="absolute top-2 left-2 px-3 py-1 bg-red-500 text-white text-xs rounded">Sale</span>}
        <div className="flex justify-center items-center h-36 mb-5">
          <Image src={image || '/placeholder.jpg'} alt={name} width={200} height={200} className="rounded-lg object-cover py-2 p-4" />
        </div>
        <div className="flex justify-between items-center mb-2 py-4">
          <h3 className="text-lg font-bold">{name}</h3>
          <button 
            className="bg-gray-200 p-2 rounded-full hover:bg-green-200 hover:scale-110 transition-transform duration-200"
            onClick={handleAddToCart}
          >
            <ShoppingCartIcon className="w-4 h-4" />
          </button>
        </div>
        <p className="text-lg font-semibold">
          {oldPrice ? (
            <>
              <span className="text-red-500 line-through mr-2">{price.toLocaleString()} vnd</span>
              <span className="text-black">{oldPrice.toLocaleString()} vnd</span>
            </>
          ) : (
            <span>{price.toLocaleString()} vnd</span>
          )}
        </p>
      </div>
    </Link>
  );
};

const HotFeatures: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchProducts = async () => {
    const response = await fetch('/api/homepage');
    const data: Product[] = await response.json();
    setProducts(data);
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -308 : 308,
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
          style={{ width: '1220px' }}
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
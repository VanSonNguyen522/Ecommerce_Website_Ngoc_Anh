"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShoppingCartIcon } from '@heroicons/react/outline';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface Product {
  id: string;
  image: string;
  name: string;
  price: string;
  oldPrice?: string;
  status?: string;
  isNew?: boolean;
  isOnSale?: boolean;
}

const ProductCard: React.FC<Product> = ({ id, image, name, price, oldPrice, isNew, isOnSale }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    
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
    <Link href={`/products/${id}`} className="block relative bg-white border-dotted border-[1.5px] border-gray-600 rounded-lg shadow-md overflow-hidden group p-4">
      <div className="relative w-full h-60 overflow-hidden">
        <Image
          src={image || '/placeholder.jpg'}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-110 transition-transform duration-200 ease-in-out"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2 py-4">
          <h3 className="text-lg font-medium text-gray-700">{name}</h3>
          <button
            className="bg-gray-200 p-2 rounded-full hover:bg-green-200 hover:scale-110 transition-transform duration-200"
            onClick={handleAddToCart}
          >
            <ShoppingCartIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900">{price}</span>
          {oldPrice && (
            <span className="text-sm line-through text-red-400">{oldPrice}</span>
          )}
        </div>
      </div>
      {isNew && (
        <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
          New
        </span>
      )}
      {isOnSale && (
        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          Sale
        </span>
      )}
    </Link>
  );
};

const Product_Demo = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/homepage?status=${selectedStatus}`);
      if (!response.ok) {
        throw new Error('Error fetching products');
      }
      const data: Product[] = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedStatus]);

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
  };

  if (loading) {
    return <div className="text-center">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Sản Phẩm Của Chúng Tôi</h2>
      <div className="flex justify-center mb-4 py-4">
        <nav className="flex space-x-4">
          <button onClick={() => handleStatusChange('all')} className={`text-gray-500 hover:text-gray-900 ${selectedStatus === 'all' ? 'font-bold' : ''}`}>ALL</button>
          <button onClick={() => handleStatusChange('newest')} className={`text-gray-500 hover:text-gray-900 ${selectedStatus === 'newest' ? 'font-bold' : ''}`}>NEWEST</button>
          <button onClick={() => handleStatusChange('trending')} className={`text-gray-500 hover:text-gray-900 ${selectedStatus === 'trending' ? 'font-bold' : ''}`}>TRENDING</button>
          <button onClick={() => handleStatusChange('best-sellers')} className={`text-gray-500 hover:text-gray-900 ${selectedStatus === 'best-sellers' ? 'font-bold' : ''}`}>BEST SELLERS</button>
          <button onClick={() => handleStatusChange('featured')} className={`text-gray-500 hover:text-gray-900 ${selectedStatus === 'featured' ? 'font-bold' : ''}`}>FEATURED</button>
        </nav>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-18 px-24">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
          />
        ))}
      </div>
    </div>
  );
};

export default Product_Demo;
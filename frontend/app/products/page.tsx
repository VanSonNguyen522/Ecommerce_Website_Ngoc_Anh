"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProductCard from './components/ProductsCard';
import SearchBar from './components/SearchBar';
import CategorySelector from './components/CategorySelect';
import { Button } from '@/components/ui/button';
import toast, { Toaster } from 'react-hot-toast';

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

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'failed'>('idle');
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchTerm = searchParams.get('name') || '';
  const selectedCategory = searchParams.get('category') || '';

  useEffect(() => {
    fetchProducts();
    setLocalSearchTerm(searchTerm);
  }, [searchTerm, selectedCategory]);

const fetchProducts = async () => {
  setStatus('loading');
  let isFirstRender = true; // Use a flag to ensure that we only show the toast once
  try {
    const query = new URLSearchParams();
    if (searchTerm) query.set('name', searchTerm);
    if (selectedCategory) query.set('category', selectedCategory.toLowerCase());

    const response = await fetch(`/api/products?${query.toString()}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (response.status === 204 || data.length === 0) {
      setProducts([]);
      if (isFirstRender) {
        toast.error('No products found');
        isFirstRender = false; // Set the flag to false to prevent multiple toasts
      }
    } else {
      setProducts(data);
      if (isFirstRender) {
        toast.success(`Found ${data.length} products`);
        isFirstRender = false; // Set the flag to false to prevent multiple toasts
      }
    }
    setStatus('idle');
  } catch (error) {
    console.error('Error fetching products:', error);
    setStatus('failed');
    toast.error('Failed to fetch products. Please try again later.');
  }
};

  const handleSearch = () => {
    if (localSearchTerm.trim().length < 3) {
      toast.error('Please enter at least 3 characters to search');
      return;
    }

    const query = new URLSearchParams(searchParams);
    if (localSearchTerm) query.set('name', localSearchTerm);
    else query.delete('name');
    query.delete('category');
    router.push(`/products?${query.toString()}`);
  };

  const handleSearchChange = (value: string) => {
    setLocalSearchTerm(value);
  };

  const handleCategorySelect = (category: string) => {
    const query = new URLSearchParams(searchParams);
    if (category) query.set('category', category.toLowerCase());
    else query.delete('category');
    query.delete('name');
    setLocalSearchTerm('');
    router.push(`/products?${query.toString()}`);
  };

  const handleReload = () => {
    setLocalSearchTerm('');
    router.push('/products');
  };

  const handleAddToCart = (product: Product) => {
    console.log(`Added ${product.name} to cart.`);
    toast.success(`Added ${product.name} to cart`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      {/* <Toaster position="top-right" /> */}
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Products</h1>
        
        <SearchBar
          searchTerm={localSearchTerm}
          onSearchChange={handleSearchChange}
          onSearch={handleSearch}
        />

        <CategorySelector
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
        
        <div className="flex justify-center mb-8">
          <Button
            onClick={handleReload}
            className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
          >
            Reset Filters
          </Button>
        </div>

        {status === 'loading' && (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        )}

        {status === 'idle' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;

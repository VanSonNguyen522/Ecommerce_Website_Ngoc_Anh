"use client"
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProductCard from './components/ProductsCard';
import SearchBar from './components/SearchBar';
import CategorySelector from './components/CategorySelect';
import { Button } from '@/components/ui/button';

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
  const [searchParams, setSearchParams] = useState({ name: '' });
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchInitialProducts = async () => {
      setStatus('loading');
      try {
        const response = await fetch('/api/productsPage');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setStatus('idle');
      } catch (error) {
        console.error(error);
        setStatus('failed');
      }
    };

    fetchInitialProducts();
  }, []);

  const fetchProducts = async () => {
    setStatus('loading');
    try {
      const query = new URLSearchParams();

      if (searchParams.name) {
        query.set('name', searchParams.name);
      }

      if (selectedCategory) {
        query.set('category', selectedCategory);
      }

      const response = await fetch(`/api/productsPage?${query.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
      setStatus('idle');
    } catch (error) {
      console.error(error);
      setStatus('failed');
    }
  };

  const handleSearch = () => {
    fetchProducts();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchParams({ name: value });
    setSelectedCategory('');
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSearchParams({ name: '' });
    fetchProducts();
  };

  const handleReload = async () => {
    setSearchParams({ name: '' });
    setSelectedCategory('');
    await fetchProducts();
  };

  const handleAddToCart = (product: Product) => {
    console.log(`Added ${product.name} to cart.`);
  };

  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="flex items-center justify-center min-h-screen">Error fetching products</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Products</h1>
        
        <div className="flex justify-center mb-4">
          <SearchBar
            searchParams={searchParams}
            onChange={handleInputChange}
            onSearch={handleSearch}
          />
        </div>

        <CategorySelector onCategorySelect={handleCategorySelect} />
        
        <div className="flex justify-center mb-6">
          <Button
            onClick={handleReload}
            className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 transition duration-300"
          >
            Reload
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="p-4">
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;

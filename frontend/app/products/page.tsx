"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProductCard from './components/ProductsCard';
import SearchBar from './components/SearchBar';
import CategorySelector from './components/CategorySelect';
import { Button } from '@/components/ui/button'; // Import Button component

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

  // Fetch products on initial mount
  useEffect(() => {
    const fetchInitialProducts = async () => {
      setStatus('loading');
      try {
        const response = await fetch('/api/productsPage'); // Fetch all products
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
  }, []); // Empty dependency array to run only once on mount

  const fetchProducts = async () => {
    setStatus('loading');
    try {
      const query = new URLSearchParams();

      // Add search parameter only if it exists
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
    fetchProducts(); // Fetch products based on current search parameters
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchParams({ name: value }); // Update searchParams without fetching
    setSelectedCategory(''); // Reset selected category when entering a new search
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category); // Set selected category
    setSearchParams({ name: '' }); // Clear the search input when selecting a category
    fetchProducts(); // Fetch products based on the selected category
  };

  // New function to reload all products
  const handleReload = async () => {
    setSearchParams({ name: '' }); // Reset search parameters
    setSelectedCategory(''); // Reset selected category
    await fetchProducts(); // Fetch all products
  };

  const handleAddToCart = (product: Product) => {
    // Logic to add product to cart
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
        
        {/* Center SearchBar above CategorySelector */}
        <div className="flex justify-center mb-4">
          <SearchBar
            searchParams={searchParams}
            onChange={handleInputChange}
            onSearch={handleSearch} // Pass the search handler to SearchBar
          />
        </div>

        <CategorySelector onCategorySelect={handleCategorySelect} />
        
        {/* Move Reload button below the CategorySelector */}
        <div className="flex justify-center mb-6">
          <Button
            onClick={handleReload}
            className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 transition duration-300"
          >
            Reload
          </Button>
        </div>

        {/* Updated grid layout for Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="p-4"> {/* Keep padding for the grid item */}
              <ProductCard product={product} onAddToCart={handleAddToCart} /> {/* Directly render ProductCard */}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;

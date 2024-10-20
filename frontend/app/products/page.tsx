// "use client"
// import React, { useEffect, useState } from 'react';
// import Navbar from '../../components/Navbar';
// import Footer from '../../components/Footer';
// import ProductCard from './components/ProductsCard';
// import SearchBar from './components/SearchBar';
// import CategorySelector from './components/CategorySelect';
// import { Button } from '@/components/ui/button';

// interface Product {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   oldPrice?: number | null;
//   category: string;
//   image?: string | null;
//   isNew?: boolean;
//   isOnSale?: boolean;
//   status?: string | null;
// }

// const ProductsPage: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [status, setStatus] = useState<'idle' | 'loading' | 'failed'>('idle');
//   const [searchParams, setSearchParams] = useState({ name: '' });
//   const [selectedCategory, setSelectedCategory] = useState('');

//   // Fetch all products when the page loads
//   useEffect(() => {
//     const fetchInitialProducts = async () => {
//       setStatus('loading');
//       try {
//         const response = await fetch('/api/productsPage');
//         if (!response.ok) {
//           throw new Error('Failed to fetch products');
//         }
//         const data = await response.json();
//         setProducts(data);
//         setStatus('idle');
//       } catch (error) {
//         console.error(error);
//         setStatus('failed');
//       }
//     };
//     fetchInitialProducts();
//   }, []);

//   // Fetch products based on search or category
//   const fetchProducts = async () => {
//     setStatus('loading');
//     try {
//       const query = new URLSearchParams();

//       if (searchParams.name) {
//         query.set('name', searchParams.name);
//       }

//       if (selectedCategory) {
//         query.set('category', selectedCategory);
//       }

//       const response = await fetch(`/api/productsPage?${query.toString()}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch products');
//       }
//       const data = await response.json();
//       setProducts(data);
//       setStatus('idle');
//     } catch (error) {
//       console.error(error);
//       setStatus('failed');
//     }
//   };

//   // Handle search functionality
//   const handleSearch = () => {
//     fetchProducts();
//   };

//   // Handle input change in search
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value } = e.target;
//     setSearchParams({ name: value });
//     setSelectedCategory(''); // Clear category if searching by name
//   };

//   // Handle category selection
//   const handleCategorySelect = (category: string) => {
//     console.log(category)
//     setSearchParams({ name: '' }); // Clear search if filtering by category
//     setSelectedCategory(category);
//     fetchProducts();
//   };

//   // Reload all products by clearing filters
//   const handleReload = async () => {
//     setSearchParams({ name: '' });
//     setSelectedCategory('');
//     await fetchProducts();
//   };

//   // Handle adding products to cart
//   const handleAddToCart = (product: Product) => {
//     console.log(`Added ${product.name} to cart.`);
//   };

//   if (status === 'loading') {
//     return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
//   }

//   if (status === 'failed') {
//     return <div className="flex items-center justify-center min-h-screen">Error fetching products</div>;
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <Navbar />
//       <div className="container mx-auto p-6">
//         <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Products</h1>
        
//         {/* Search Bar */}
//         <div className="flex justify-center mb-4">
//           <SearchBar
//             searchParams={searchParams}
//             onChange={handleInputChange}
//             onSearch={handleSearch}
//           />
//         </div>

//         {/* Category Selector */}
//         <CategorySelector onCategorySelect={handleCategorySelect} />
        
//         {/* Reload Button */}
//         <div className="flex justify-center mb-6">
//           <Button
//             onClick={handleReload}
//             className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 transition duration-300"
//           >
//             Reload
//           </Button>
//         </div>

//         {/* Product List */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {products.map((product) => (
//             <div key={product.id} className="p-4">
//               <ProductCard product={product} onAddToCart={handleAddToCart} />
//             </div>
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default ProductsPage;

"use client"
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
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchTerm = searchParams.get('search') || '';
  const selectedCategory = searchParams.get('category') || '';

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, selectedCategory]);

  const fetchProducts = async () => {
    setStatus('loading');
    try {
      const query = new URLSearchParams();
      if (searchTerm) query.set('search', searchTerm);
      if (selectedCategory) query.set('category', selectedCategory.toLowerCase());

      const response = await fetch(`/api/products?${query.toString()}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (response.status === 204 || data.length === 0) {
        setProducts([]);
        toast.error('No products found');
      } else {
        setProducts(data);
        toast.success(`Found ${data.length} products`);
      }
      setStatus('idle');
    } catch (error) {
      console.error('Error fetching products:', error);
      setStatus('failed');
      toast.error('Failed to fetch products. Please try again later.');
    }
  };

  const handleSearch = () => {
    const query = new URLSearchParams(searchParams);
    if (searchTerm) query.set('search', searchTerm);
    else query.delete('search');
    query.delete('category');
    router.push(`/products?${query.toString()}`);
  };

  const handleSearchChange = (value: string) => {
    const query = new URLSearchParams(searchParams);
    if (value) query.set('search', value);
    else query.delete('search');
    router.push(`/products?${query.toString()}`);
  };

  const handleCategorySelect = (category: string) => {
    const query = new URLSearchParams(searchParams);
    if (category) query.set('category', category.toLowerCase());
    else query.delete('category');
    query.delete('search');
    router.push(`/products?${query.toString()}`);
  };

  const handleReload = () => {
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
          searchTerm={searchTerm}
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
"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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

const ProductDetailPage: React.FC<{ params: { productId: string } }> = ({ params }) => {
  const { productId } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'failed'>('idle');

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      setStatus('loading');
      try {
        const response = await fetch(`/api/productsPage/${productId}`); // Đảm bảo đường dẫn API đúng
        if (!response.ok) throw new Error('Failed to fetch product details');
        const data: Product = await response.json();
        setProduct(data);
        setStatus('idle');
      } catch (error) {
        console.error('Error fetching product:', error);
        setStatus('failed');
      }
    };

    fetchProduct();
  }, [productId]);

  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="flex items-center justify-center min-h-screen">Error fetching product details</div>;
  }

  if (!product) {
    return <div className="flex items-center justify-center min-h-screen">Product not found</div>;
  }

  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex flex-col md:flex-row md:space-x-8 bg-white p-6 rounded-lg shadow-lg">
          <div className="md:w-1/2">
            <img
              src={product.image || '/placeholder-image.png'}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2 flex flex-col justify-between">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Name: {product.name}</h1>
            <p className="text-xl font-semibold text-gray-600 mb-4">Giới thiệu: {product.description}</p>
            <p className="text-3xl font-bold text-green-600 mb-4">Giá cho 1 sản phẩm: {product.price.toFixed(0)} vnd</p>
            {product.oldPrice && (
              <p className="text-lg line-through text-gray-500 mb-4">
                Old Price: ${product.oldPrice.toFixed(2)}
              </p>
            )}
            <div className="flex space-x-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-300">
                Add to Cart
              </button>
              <button className="bg-green-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-700 transition duration-300">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Product Description Section */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2">Product Description</h2>
          <p className="text-gray-700">{product.description}</p>
        </div>

        {/* More Information Section */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">More About This Product</h2>
          <p className="text-gray-700 mb-2">
            There’s nothing I really wanted to do in life that I wasn’t able to get good at. That’s my skill. I’m not really specifically talented at anything except for the ability to learn.
          </p>
          <h3 className="text-xl font-semibold mb-2">Benefits:</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>Oils are a primary source for various sectors.</li>
            <li>Offers a wide range of products.</li>
            <li>Crucial source for manufacturing plastics.</li>
          </ul>
        </div>

        {/* Related Products Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Render related products here */}
            <div className="bg-white p-4 rounded-lg shadow">
              <img src="/placeholder-image.png" alt="Related Product" className="w-full h-32 object-cover mb-2 rounded" />
              <h3 className="text-lg font-semibold">Related Product 1</h3>
              <p className="text-gray-600">$19.99</p>
            </div>
            {/* More related products */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;

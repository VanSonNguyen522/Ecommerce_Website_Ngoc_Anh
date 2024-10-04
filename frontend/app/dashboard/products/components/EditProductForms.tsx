"use client";

import { useState } from 'react';
import { toast } from 'react-hot-toast';

const EditProductForm: React.FC = () => {
  const [productId, setProductId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('sắt hộp');
  const [status, setStatus] = useState('');
  const [isNew, setIsNew] = useState(false);
  const [isOnSale, setIsOnSale] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateProductId = async (id: string): Promise<boolean> => {
    const response = await fetch(`/api/products/${id}`);
    return response.ok; // Trả về true nếu sản phẩm tồn tại
  };
  // Handle form submission to update the product
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Kiểm tra sự tồn tại của sản phẩm
    const isValidId = await validateProductId(productId);
    if (!isValidId) {
      toast.error('Product ID not found. Please enter a valid Product ID.');
      setLoading(false);
      console.log({
        name,
        description,
        price,
        image,
        category,
        status,
        isNew,
        isOnSale,
      });
      return;
    }
  
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: name || undefined, 
          description: description || undefined, 
          price: price ? parseFloat(price) : undefined, 
          image: image || undefined, 
          category: category || undefined, 
          status: status || undefined, 
          isNew, 
          isOnSale 
        }),
      });
  
      if (response.ok) {
        toast.success('Product updated successfully');
      } else {
        const errorResponse = await response.json();
        toast.error(`Failed to update product: ${errorResponse.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
      console.log({
        name,
        description,
        price,
        image,
        category,
        status,
        isNew,
        isOnSale,
      });
    } finally {
      setLoading(false);
      console.log('Product ID:', productId);
    }
  };
  

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 className="text-xl font-bold mb-4">Edit Product</h1>

      <form onSubmit={handleSubmit}>
        {/* Input Field for Product ID */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Product ID *</label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Other Fields - Optional */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="sắt hộp">Sắt Hộp</option>
            <option value="ván gỗ">Ván Gỗ</option>
            <option value="lưới b40">Lưới B40</option>
            <option value="tôn lạnh xốp">Tôn Lạnh Xốp</option>
            <option value="ván symbo">Ván Symbo</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Status (Optional)</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Status</option>
            <option value="newest">Newest</option>
            <option value="trending">Trending</option>
            <option value="featured">Featured</option>
            <option value="best seller">Best Seller</option>
          </select>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={isNew}
            onChange={(e) => setIsNew(e.target.checked)}
            className="mr-2"
          />
          <label className="text-gray-700">Is New</label>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={isOnSale}
            onChange={(e) => setIsOnSale(e.target.checked)}
            className="mr-2"
          />
          <label className="text-gray-700">Is On Sale</label>
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
};

export default EditProductForm;

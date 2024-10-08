import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  status?: string; // Optional status field
  category: string; // Category field
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchName, setSearchName] = useState('');
  const [searchPrice, setSearchPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category

  const fetchProducts = async (category: string = '') => {
    const res = await fetch(`/api/products?category=${category}`);
    const data: Product[] = await res.json();
    setProducts(data);
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts(); // Fetch all products on initial render
  }, []);

  const handleCheckboxChange = (productId: string) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(productId)) {
        return prevSelected.filter((id) => id !== productId);
      } else {
        return [...prevSelected, productId];
      }
    });
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const fetchSearchProducts = async (name: string = '', price: string = '') => {
    const res = await fetch(`/api/products?name=${name}&price=${price}`);
    const data: Product[] = await res.json();
    setProducts(data);
  };

  const handleSearchByName = async () => {
    await fetchSearchProducts(searchName);
    setCurrentPage(1);
  };

  const handleSearchByPrice = async () => {
    await fetchSearchProducts('', searchPrice);
    setCurrentPage(1);
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(selectedProducts.map(async (productId) => {
        const res = await fetch(`/api/products?id=${productId}`, { method: 'DELETE' });
        
        if (res.ok) {
          toast.success("Product deleted successfully!");
          fetchProducts();
        } else {
          toast.error("Failed to delete product.");
        }
      }));
      fetchProducts();
      setSelectedProducts([]);
    } catch (error) {
      console.error('Error deleting products:', error);
    }
  };

  const handleFilterByCategory = async () => {
    await fetchProducts(selectedCategory);
    setCurrentPage(1);
  };

  return (
    <div className='py-10'>
      <h1 className='font-bold text-2xl py-3 text-center'>All Products</h1>
      <div className='flex justify-between px-10 mb-4'>
        <button onClick={handleRefresh} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Refresh
        </button>

        <button
          onClick={handleBulkDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          disabled={selectedProducts.length === 0}
        >
          Delete Selected
        </button>
      </div>

      <div className='flex justify-center mb-4'>
        <input
          type="text"
          placeholder="Search by product name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={handleSearchByName}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Search by Name
        </button>
      </div>

      <div className='flex justify-center mb-4'>
        <input
          type="number"
          placeholder="Search by price"
          value={searchPrice}
          onChange={(e) => setSearchPrice(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={handleSearchByPrice}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Search by Price
        </button>
      </div>

      <div className='flex justify-center mb-4'>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded mr-2"
        >
          <option value="">All Categories</option>
          <option value="sắt hộp">Sắt Hộp</option>
          <option value="ván gỗ">Ván Gỗ</option>
          <option value="lưới b40">Lưới B40</option>
          <option value="tôn lạnh">Tôn Lạnh</option>
          <option value="xốp">Xốp</option>
          <option value="ván symbo">Ván Symbo</option>
        </select>
        <button
          onClick={handleFilterByCategory}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Filter by Category
        </button>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b-2 border-gray-200">Select</th>
            <th className="py-2 px-4 border-b-2 border-gray-200">ID</th>
            <th className="py-2 px-4 border-b-2 border-gray-200">Name</th>
            <th className="py-2 px-4 border-b-2 border-gray-200">Description</th>
            <th className="py-2 px-4 border-b-2 border-gray-200">Price</th>
            <th className="py-2 px-4 border-b-2 border-gray-200">Category</th>
            <th className="py-2 px-4 border-b-2 border-gray-200">Status</th>
            <th className="py-2 px-4 border-b-2 border-gray-200">Image</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-2 px-4 text-center">No products found.</td>
            </tr>
          ) : (
            currentProducts.map(product => (
              <tr key={product.id}>
                <td className="py-2 px-4 border-b border-gray-200">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleCheckboxChange(product.id)}
                  />
                </td>
                <td className="py-2 px-4 border-b border-gray-200">{product.id}</td>
                <td className="py-2 px-4 border-b border-gray-200">{product.name}</td>
                <td className="py-2 px-4 border-b border-gray-200">{product.description}</td>
                <td className="py-2 px-4 border-b border-gray-200">{formatPrice(product.price)}</td>
                <td className="py-2 px-4 border-b border-gray-200">{product.category}</td>
                <td className="py-2 px-4 border-b border-gray-200">{product.status || 'N/A'}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {product.image ? <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" /> : 'No Image'}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">{currentPage} / {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded ml-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;

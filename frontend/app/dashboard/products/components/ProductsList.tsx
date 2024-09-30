import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

// Define the type for a product
interface Product {
  id: string; // Assuming ID is a string based on your Prisma schema
  name: string;
  description: string;
  price: number;
  image: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const productsPerPage = 10; // Products per page
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');  // Selected product IDs
    const [searchName, setSearchName] = useState(''); // State cho tên sản phẩm tìm kiếm
  const [searchPrice, setSearchPrice] = useState(''); // State cho giá sản phẩm tìm kiếm

  // Function to fetch data from the API
  const fetchProducts = async () => {
    const res = await fetch('/api/products'); // Gọi API để lấy danh sách sản phẩm
    const data: Product[] = await res.json(); // Chỉ định kiểu dữ liệu
    setProducts(data); // Cập nhật state với dữ liệu sản phẩm
    setCurrentPage(1); // Đặt lại trang về 1 khi refresh
  };

  const handleRefresh = () => {
    fetchProducts(); // Gọi hàm fetchProducts để cập nhật dữ liệu
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);

  

  const handleCheckboxChange = (productId: string) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(productId)) {
        // If the product is already selected, remove it from the list
        return prevSelected.filter((id) => id !== productId);
      } else {
        // If not selected, add it to the list
        return [...prevSelected, productId];
      }
    });
  };

  // Calculate pagination indices
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct); // Get products for the current page

  // Total pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Handle Next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle Previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const fetchSearchProducts = async (name: string = '', price: string = '') => {
    const res = await fetch(`/api/products?name=${name}&price=${price}`); // Gọi API với tên và giá sản phẩm tìm kiếm
    const data: Product[] = await res.json(); // Xác định kiểu của data là mảng Product
    setProducts(data); // Cập nhật state với dữ liệu sản phẩm
  };
  

  const handleSearchByName = async () => {
    console.log("Searching by name:", searchName);
    await fetchSearchProducts(searchName);
    setCurrentPage(1); // Đặt lại trang về 1 khi tìm kiếm
  };
  
  const handleSearchByPrice = async () => {
    console.log("Searching by price:", searchPrice);
    await fetchSearchProducts('', searchPrice);
    setCurrentPage(1); // Đặt lại trang về 1 khi tìm kiếm
  };
  
  

  const handleBulkDelete = async () => {
    try {
      await Promise.all(selectedProducts.map(async (productId) => {
        const res = await fetch(`/api/products?id=${productId}`, {
          method: 'DELETE',
        });
        
      if (res.ok) {
        console.log('Product deleted successfully');
        toast.success("Product delete successfully!");
        fetchProducts(); // Refresh product list after deletion
      } else {
        console.error('Failed to delete product');
        toast.error("Failed to delete product.");
      }
      }));
      fetchProducts(); // Refresh product list after deletion
      setSelectedProducts([]); // Clear selected products
    } catch (error) {
      console.error('Error deleting products:', error);
    }
  };

  return (
    <div className='py-10'>
      <h1 className='font-bold text-2xl py-3 text-center'>All Products</h1>
      <div className='flex justify-between px-10 mb-4'>
        <button
          onClick={handleRefresh}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
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
          onChange={(e) => setSearchName(e.target.value)} // Cập nhật giá trị nhập vào
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={handleSearchByName} // Gọi hàm tìm kiếm theo tên khi nhấn nút
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Search by Name
        </button>
      </div>

      {/* Trường nhập liệu để tìm kiếm theo giá */}
      <div className='flex justify-center mb-4'>
        <input
          type="number"
          placeholder="Search by price"
          value={searchPrice}
          onChange={(e) => setSearchPrice(e.target.value)} // Cập nhật giá trị nhập vào
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={handleSearchByPrice} // Gọi hàm tìm kiếm theo giá khi nhấn nút
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Search by Price
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
            <th className="py-2 px-4 border-b-2 border-gray-200">Image</th>
          </tr>
        </thead>
        <tbody>
            {currentProducts.length === 0 ? (
                <tr>
                <td colSpan={6} className="py-2 px-4 text-center">No products found.</td>
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
                    <td className="py-2 px-4 border-b border-gray-200">
                    {product.image ? <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" /> : 'No Image'}
                    </td>
                </tr>
                ))
            )}
        </tbody>

      </table>

      {/* Pagination controls */}
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

import { useEffect, useState } from 'react';

// Định nghĩa kiểu cho sản phẩm
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const productsPerPage = 10; // Số sản phẩm mỗi trang
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  // Hàm fetch dữ liệu từ API
  const fetchProducts = async () => {
    const res = await fetch('/api/products'); // Gọi API để lấy danh sách sản phẩm
    const data: Product[] = await res.json(); // Xác định kiểu của data là mảng Product
    setProducts(data); // Cập nhật state với dữ liệu sản phẩm
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRefresh = () => {
    fetchProducts(); // Gọi lại API để cập nhật dữ liệu mới
  };

  const handleCheckboxChange = (productId: number) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(productId)) {
        // Nếu đã chọn sản phẩm, bỏ chọn sản phẩm đó
        return prevSelected.filter((id) => id !== productId);
      } else {
        // Nếu chưa chọn, thêm sản phẩm vào danh sách được chọn
        return [...prevSelected, productId];
      }
    });
  };

  // Tính toán các chỉ số phân trang
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct); // Lấy sản phẩm cho trang hiện tại

  // Tổng số trang
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Hàm xử lý khi nhấn nút "Next"
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Hàm xử lý khi nhấn nút "Previous"
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className='py-10'>
      <h1 className='font-bold text-2xl py-3 text-center'>All Products </h1>
      <button
        onClick={handleRefresh}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 p-4"
      >
        Refresh
      </button>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b-2 border-gray-200">ID</th>
            <th className="py-2 px-4 border-b-2 border-gray-200">Name</th>
            <th className="py-2 px-4 border-b-2 border-gray-200">Description</th>
            <th className="py-2 px-4 border-b-2 border-gray-200">Price</th>
            <th className="py-2 px-4 border-b-2 border-gray-200">Image</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map(product => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b border-gray-200">{product.id}</td>
              <td className="py-2 px-4 border-b border-gray-200">{product.name}</td>
              <td className="py-2 px-4 border-b border-gray-200">{product.description}</td>
              <td className="py-2 px-4 border-b border-gray-200">{formatPrice(product.price)}</td>
              <td className="py-2 px-4 border-b border-gray-200">
                {product.image ? <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" /> : 'No Image'}
              </td>
            </tr>
          ))}
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

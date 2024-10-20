// "use client";

// import React, { useState, useEffect } from 'react';
// import ProductCard from './Product_Card';

// interface Product {
//   id: number; // Hoặc String nếu id là ObjectId
//   image: string;
//   name: string;
//   price: string; // Hoặc number nếu bạn muốn lưu trữ giá dưới dạng số
//   oldPrice?: string; // Đánh dấu là optional
//   status?: string; // Thêm nếu bạn muốn lưu trạng thái
// }

// const Product_Demo = () => {
//   const [products, setProducts] = useState<Product[]>([]); // Khai báo kiểu cho mảng products
//   const [selectedStatus, setSelectedStatus] = useState<string>('all'); // Chỉ định kiểu cho selectedStatus

//   // Fetch sản phẩm từ API
//   const fetchProducts = async () => {
//     try {
//       const response = await fetch(`/api/homepage?status=${selectedStatus}`); // Gọi endpoint api/homepage với status
//       if (!response.ok) {
//         throw new Error('Error fetching products');
//       }
//       const data: Product[] = await response.json(); // Xác định kiểu dữ liệu cho data
//       setProducts(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [selectedStatus]); // Fetch lại dữ liệu khi selectedStatus thay đổi

//   const handleStatusChange = (status: string) => {
//     setSelectedStatus(status); // Chỉ định kiểu cho tham số status
//   };

//   return (
//     <div className="bg-white px-4 py-8">
//       <h2 className="text-3xl font-bold text-center mb-8">Sản Phẩm Của Chúng Tôi</h2>
//       <div className="flex justify-center mb-4 py-4">
//         <nav className="flex space-x-4">
//           <button onClick={(e) => { e.preventDefault(); handleStatusChange('all'); }} className={`text-gray-500 hover:text-gray-900 ${selectedStatus === 'all' ? 'font-bold' : ''}`}>ALL</button>
//           <button onClick={(e) => { e.preventDefault(); handleStatusChange('newest'); }} className={`text-gray-500 hover:text-gray-900 ${selectedStatus === 'newest' ? 'font-bold' : ''}`}>NEWEST</button>
//           <button onClick={(e) => { e.preventDefault(); handleStatusChange('trending'); }} className={`text-gray-500 hover:text-gray-900 ${selectedStatus === 'trending' ? 'font-bold' : ''}`}>TRENDING</button>
//           <button onClick={(e) => { e.preventDefault(); handleStatusChange('best-sellers'); }} className={`text-gray-500 hover:text-gray-900 ${selectedStatus === 'best-sellers' ? 'font-bold' : ''}`}>BEST SELLERS</button>
//           <button onClick={(e) => { e.preventDefault(); handleStatusChange('featured'); }} className={`text-gray-500 hover:text-gray-900 ${selectedStatus === 'featured' ? 'font-bold' : ''}`}>FEATURED</button>
//         </nav>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-18 px-24">
//         {products.map((product) => (
//           <ProductCard
//             key={product.id}
//             image={product.image}
//             name={product.name}
//             price={product.price.toString()} // Chuyển đổi giá trị thành chuỗi
//             oldPrice={product.oldPrice} // oldPrice có thể là undefined, sẽ không gây lỗi
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Product_Demo;

"use client";

import React, { useState, useEffect } from 'react';
import ProductCard from './Product_Card';

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

const Product_Demo = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const fetchProducts = async () => {
    try {
      const response = await fetch(`/api/homepage?status=${selectedStatus}`);
      if (!response.ok) {
        throw new Error('Error fetching products');
      }
      const data: Product[] = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedStatus]);

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
  };

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
            id={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            oldPrice={product.oldPrice}
            isNew={product.isNew}
            isOnSale={product.isOnSale}
          />
        ))}
      </div>
    </div>
  );
};

export default Product_Demo;
// // components/NewCollection.tsx
// import React from 'react';

// const Hero: React.FC = () => {
//   return (
//     <section className="flex items-center justify-center min-h-screen bg-white p-6">
//       <div className="flex items-center bg-white p-6 rounded-lg">
//         <div className="flex-1 px-14">
//           {/* Left Side - Image */}
//           <img 
//           src="../../../assets/images/Hero.png"
//           alt="Hero.png"
//           className="w-full h-full object-cover rounded-md"
//           >        
//           </img>
//           <div className="flex-1 p-8">
//           {/* Right Side - Text */}
//           <p className="text-sm uppercase tracking-wider text-gray-500">New Arrival</p>
//           <h1 className="text-4xl font-bold text-yellow-600 mt-2">
//             Discover Our New Collection
//           </h1>
//           <p className="mt-4 text-gray-700">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
//           </p>
//           <button className="mt-6 bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-500">
//             Buy Now
//           </button>
//         </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="flex items-center justify-center p-4 bg-white">
      <div className="relative w-3/4 rounded-lg overflow-hidden">
        {/* Image Section */}
        <img
          src="../../../assets/images/Hero.png"
          alt="Hero.png"
          className="w-full h-[500px] object-cover"
        />

        {/* Text Section (Overlay) */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8 text-white">
          <p className="text-sm uppercase tracking-wider text-gray-200">Trải nghiệm quá trình mua hàng của bạn</p>
          <h1 className="text-4xl font-bold text-yellow-400 mt-2">
            Tham quan những sản phẩm nổi bật của chúng tôi
          </h1>
          <p className="mt-4">
            Bấm vào nút bên dưới để mua ngay những sản phẩm mà mình cần với giá tốt nhất
          </p>
          <button className="mt-6 bg-yellow-400 text-black py-2 px-4 rounded-lg hover:bg-yellow-300">
            Buy Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
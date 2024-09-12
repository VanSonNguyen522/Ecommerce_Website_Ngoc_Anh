
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
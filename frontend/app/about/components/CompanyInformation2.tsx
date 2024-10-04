import React from "react";
import Image from "next/image";

const CompanyVisionMissionValues = () => {
  return (
    <div className="container mx-auto flex flex-col lg:flex-row justify-center items-center py-12 px-6 bg-gray-50">
      {/* Image Section on the Left */}
      <div className="lg:w-1/2 flex justify-center lg:mr-20 mb-6 lg:mb-0">
        <Image
          src="/assets/images/logocompanylink/NgocAnhlogo2.png"
          alt="Ngọc Ánh"
          className="rounded-lg shadow-lg"
          width={600} // Set the width
          height={600} // Set the height
          style={{ objectFit: 'contain' }} // Maintain aspect ratio
        />
      </div>

      {/* Text Content Section on the Right */}
      <div className="lg:w-1/2">
        <h4 className="text-2xl font-bold text-gray-800 mb-4">Tầm nhìn</h4>
        <p className="text-gray-700 mb-4">
          Ngọc Ánh hướng tới việc trở thành nhà cung cấp nhôm hàng đầu tại Việt Nam, mang đến sản phẩm chất lượng cao và dịch vụ tốt nhất cho khách hàng.
        </p>
        
        <h4 className="text-2xl font-bold text-gray-800 mb-4">Sứ mệnh</h4>
        <p className="text-gray-700 mb-4">
          Chúng tôi cam kết cung cấp các sản phẩm nhôm chất lượng cao, không ngừng đổi mới và cải tiến quy trình sản xuất, phục vụ nhu cầu đa dạng của khách hàng.
          <br />
          Tinh thần hợp tác và sự minh bạch luôn là nền tảng cho sự phát triển bền vững của công ty.
        </p>
        
        <h4 className="text-2xl font-bold text-gray-800 mb-4">Giá trị cốt lõi</h4>
        <ul className="list-disc list-inside text-gray-700">
          <li>Chính trực: Đặt uy tín và đạo đức lên hàng đầu.</li>
          <li>Trách nhiệm: Đảm bảo mọi cam kết với khách hàng.</li>
          <li>Chuyên nghiệp: Luôn cải tiến và nâng cao chất lượng dịch vụ.</li>
          <li>Đổi mới: Khuyến khích sự sáng tạo và đổi mới trong từng sản phẩm.</li>
          <li>Chất lượng: Đảm bảo chất lượng sản phẩm hàng đầu trong ngành.</li>
        </ul>
      </div>
    </div>
  );
};

export default CompanyVisionMissionValues;

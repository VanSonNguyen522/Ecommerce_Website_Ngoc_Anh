import React from "react";
import Image from "next/image";  // Import thẻ Image từ Next.js

const CompanyInfomation1 = () => {
  return (
    <div className="container mx-auto flex flex-col lg:flex-row bg-gray-50 py-12">
      {/* Left Column */}
      <div className="lg:w-1/2 px-6">
        <div className="text-left mb-6">
          <h3 className="text-3xl font-bold text-gray-900">
            CÔNG TY TNHH TM DV VLXD <span className="text-blue-600">Ngọc Ánh</span>
          </h3>
          <div className="border-b-4 border-blue-600 w-20 mt-2 mb-4"></div>
        </div>
        <div className="space-y-4 text-justify text-gray-700">
          <p>
            Được thành lập năm 2006, hơn 15 năm thành lập và phát triển Ngọc Ánh
            đã nhanh chóng phát triển thành một trong những nhà
            phân phối có uy tín trong khu vực.
          </p>
          <h4 className="font-bold">Dịch vụ chuyên nghiệp</h4>
          <p>
            Cty Ngọc Ánh tự hào là một trong những nhà cung ứng
            nhôm chuyên nghiệp, đủ khả năng đáp ứng và hợp tác với nhiều khách
            hàng lớn trong khu vực.
          </p>
          <h4 className="font-bold">Đa dạng xuất khẩu</h4>
          <p>
            Chúng tôi hiện đang cung cấp nhôm cho các khách hàng gia công sản
            xuất. Các sản phẩm xuất khẩu đáp ứng tiêu chuẩn thị trường Nhật, Trung,...
          </p>
          <p>
            Ngọc Ánh chuyên cung cấp Sắt, thép, tôn, ván, và các loại sản phẩm clxd khác
            “Đảm bảo chất lượng và Uy tín hàng đầu”.
          </p>
          <p>
            Chúng tôi luôn phấn đấu để phát triển mở rộng và đào tạo đội ngũ
            nhân viên chuyên nghiệp và cam kết mang đến sản phẩm chất lượng cho
            khách hàng.
          </p>
        </div>
      </div>

      {/* Right Column - Image */}
      <div className="lg:w-1/2 px-6 flex justify-center items-center mt-8 lg:mt-0">
        <figure>
          <Image
            src="/assets/images/logocompanylink/NgocAnhCompany.jpg"
            alt="Ngọc Ánh Logo"
            width={600} 
            height={600}
            className="rounded-lg shadow-lg"
          />
        </figure>
      </div>
    </div>
  );
};

export default CompanyInfomation1;

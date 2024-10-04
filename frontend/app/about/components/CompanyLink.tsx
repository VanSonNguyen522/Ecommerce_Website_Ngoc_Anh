import React from "react";
import Image from "next/image"; // Import thẻ Image từ Next.js

const AffiliatedCompanies = () => {
  const companies = [
    {
      name: "Nhà máy tôn Trường Hà",
      description:
        "Nơi cung cấp tôn thép uy tín cho công ty chúng tôi với các vật liệu khác.",
      logo: "/assets/images/logocompanylink/Truonghalogo.png", // Sử dụng đường dẫn ảnh từ thư mục public
      website: "",
    },
    {
      name: "Nhà máy sắt thép Nam Hưng",
      description:
        "Chuyên cung cấp các loại vật liệu xây dựng, cùng đồng hành với công ty chúng tôi trong 15 năm sự nghiệp.",
      logo: "/assets/images/logocompanylink/Nam Hung logo.jpg",
      website: "https://namhungmetal.com/",
    },
    {
      name: "Công Ty TNHH SX TM DV Bảo Luân",
      description:
        "Cung cấp các loại hàng hóa và vật liệu xây dựng tốt nhất trên thị trường.",
      logo: "/assets/images/logocompanylink/Baoluanlogo.png",
      website: "http://thepbaoluan.com.vn/",
    },
    {
      name: "CÔNG TY TNHH XNK CÁT TƯỜNG",
      description:
        "Là một trong những nhà cung ứng nhôm chuyên nghiệp, đủ khả năng đáp ứng và hợp tác với nhiều khách hàng lớn trong khu vực.",
      logo: "/assets/images/logocompanylink/LOGO-XNK-Cat-Tuong.png",
      website: "https://aluminium.com.vn/",
    },
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Our Affiliated Companies
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {companies.map((company) => (
            <div
              key={company.name}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between min-h-[300px]"  // Đặt min-height để các thẻ không bị bể
            >
              <div>
                <div className="relative h-24 w-full flex justify-center items-center mb-4">
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    layout="intrinsic" // Điều chỉnh để không fill toàn bộ vùng
                    width={100} // Cố định chiều rộng
                    height={100} // Cố định chiều cao để cân bằng kích thước
                    objectFit="contain" // Giữ tỉ lệ mà không làm biến dạng logo
                    className="rounded-md"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {company.name}
                </h3>
                <p className="text-gray-600 mb-4">{company.description}</p>
              </div>
              <a
                href={company.website}
                className="text-blue-500 hover:text-blue-700 font-medium mt-auto"
              >
                Visit Website
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AffiliatedCompanies;

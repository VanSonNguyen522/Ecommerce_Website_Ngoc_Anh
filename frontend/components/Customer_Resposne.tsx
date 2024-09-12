"use client";

import React, { useRef } from 'react';
import { FaUserTie, FaUserAlt, FaUserCircle } from 'react-icons/fa'; // Import icons
import { FaUserNurse } from "react-icons/fa6";


const testimonials = [
    {
        id: 1,
        name: "Lý Thanh Khoa",
        title: "Chất lượng sản phẩm tuyệt vời",
        quote: "“Tôi đã mua một lô hàng ván tại cửa hàng này và hoàn toàn hài lòng với chất lượng. Hàng hóa chất lượng, độ dày đúng với thông báo, giá cả hợp lý so với chất lượng, chắc chắn tôi sẽ quay lại để mua thêm.”",
        icon: <FaUserTie size={24} /> // Adjust size here
    },
    {
        id: 2,
        name: "Lê Vũ Đức Ân",
        title: "Dịch vụ khách hàng chuyên nghiệp",
        quote: "“Nhân viên ở đây rất nhiệt tình và chuyên nghiệp. Họ tư vấn rất chi tiết về các sản phẩm và giúp tôi tìm được món hàng ưng ý chỉ trong thời gian ngắn. Dịch vụ hậu mãi cũng rất tốt, có chính sách đổi trả linh hoạt.”",
        icon: <FaUserAlt size={24} />
    },
    {
        id: 3,
        name: "Nguyễn Đức Gia Bảo",
        title: "Không gian mua sắm thoải mái",
        quote: "“Cửa hàng được bày trí rất gọn gàng và thoáng mát, giúp tôi cảm thấy dễ dàng tìm kiếm sản phẩm mình cần. Ánh sáng và không khí ở đây rất dễ chịu, tạo cảm giác thoải mái khi mua sắm. Một nơi tuyệt vời để ghé thăm.”",
        icon: <FaUserCircle size={24} />
    },
    {
        id: 4,
        name: "Nguyễn Văn Sơn",
        title: "Dịch vụ giao hàng",
        quote: "“Tôi đã đặt hàng online tại cửa hàng và rất ấn tượng với tốc độ giao hàng. Chỉ trong vòng 2 ngày, tôi đã nhận được sản phẩm đóng gói cẩn thận. Sản phẩm đúng với mô tả, và tôi hoàn toàn hài lòng với dịch vụ này.”",
        icon: <FaUserNurse size={24} />
    },
];

export default function CustomerResponse() {
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -400,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 400,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl mb-8">
                Khách Hàng Nói Gì Về Dịch Vụ Của Chúng Tôi
            </h2>
            <div className="relative flex items-center px-20">
                <button 
                    onClick={scrollLeft} 
                    className="absolute left-0 z-10 bg-teal-600 text-white p-2 rounded-full focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <div 
                    className="flex overflow-x-hidden space-x-6 scrollbar-hide" 
                    ref={scrollContainerRef}
                >
                    {testimonials.map((testimonial) => (
                        <div 
                            key={testimonial.id} 
                            className="bg-white shadow-lg rounded-lg p-6 w-60 md:w-80 flex-shrink-0 transition duration-500 ease-in-out transform hover:scale-105 flex flex-col justify-between"
                        >
                            <p className="text-gray-600 leading-relaxed mb-6">{testimonial.quote}</p>
                            <div className="mt-auto flex items-center">
                                {/* Circle with centered icon */}
                                <div className="w-12 h-12 flex justify-center items-center bg-gray-100 rounded-full text-teal-600">
                                    {testimonial.icon}
                                </div>
                                <div className="ml-4">
                                    <p className="text-teal-600 font-bold">{testimonial.name}</p>
                                    <p className="text-gray-500">{testimonial.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button 
                    onClick={scrollRight} 
                    className="absolute right-0 z-10 bg-teal-600 text-white p-2 rounded-full focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

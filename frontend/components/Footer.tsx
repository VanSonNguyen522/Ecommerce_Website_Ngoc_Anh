// import Image from 'next/image';
// import { FaFacebookF, FaTwitter, FaInstagram, FaPinterest } from 'react-icons/fa';
// import { FaPaypal, FaCcVisa } from "react-icons/fa";
// import { SiMastercard } from "react-icons/si";


// export default function Footer() {
//   return (
//     <footer className="bg-white py-8">
//       <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Left Section */}
//         <div className="space-y-4">
//           <div className="flex items-center space-x-2">
//             {/* Logo */}
//             <div className="w-8 h-8">
//               <Image src="/assets/images/LOGO.png" alt="Logo" width={40} height={40} />
//             </div>
//             <h2 className="text-xl font-semibold">Ngọc Ánh Company</h2>
//           </div>
//           <p className="text-gray-600">
//             Chuyên cung cấp các mặt hàng vật liệu xây dựng uy tín trên thị trường. Nếu có bất kỳ thắc mắc gì vui lòng liên hệ trực tiếp qua hotline hoặc các phương tiện mạng xã hội.
//           </p>
//         </div>

//         {/* Middle Section */}
//         <div className="space-y-4">
//           <h3 className="font-semibold">CATEGORIES</h3>
//           <ul className="grid grid-cols-2 gap-2 text-black">
//             <li className='hover:text-blue-500 hover:underline'>Sắt hộp</li>
//             <li className='hover:text-blue-500 hover:underline'>Ván gỗ</li>
//             <li className='hover:text-blue-500 hover:underline'>Lưới B40</li>
//             <li className='hover:text-blue-500 hover:underline'>Tôn lạnh</li>
//             <li className='hover:text-blue-500 hover:underline'>Xốp</li>
//             <li className='hover:text-blue-500 hover:underline'>Ván Symbo</li>
//           </ul>
//         </div>

//         {/* Right Section */}
//         <div className="space-y-4">
//           <h3 className="font-semibold">TIN NHẮN</h3>
//           <div className="flex space-x-2">
//             <input
//               type="email"
//               placeholder="Your Email"
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none w-48"
//             />
//             <button className="bg-teal-500 text-white px-4 py-2 rounded-lg">
//               Subscribe
//             </button>
//           </div>
//           <p className="text-gray-600">
//             Hãy nhập gmail của bạn để chúng tôi có thể liên hệ trong thời gian sớm nhất.
//           </p>
//         </div>
//       </div>

//       {/* Social Icons & Payment Section */}
//       <div className="mt-8 border-t border-gray-200 pt-4">
//         <div className="container mx-auto px-4 flex justify-between items-center">
//           {/* Social Media Icons */}
//           <div className="flex space-x-4">
//             <FaFacebookF className="text-gray-500 hover:text-teal-500 cursor-pointer" />
//             <FaTwitter className="text-gray-500 hover:text-teal-500 cursor-pointer" />
//             <FaInstagram className="text-gray-500 hover:text-teal-500 cursor-pointer" />
//             <FaPinterest className="text-gray-500 hover:text-teal-500 cursor-pointer" />
//           </div>

//           {/* Payment Methods */}
//           <div className="flex space-x-4">
//             {/* <Image src="/paypal.png" alt="Paypal" width={40} height={16} />
//             <Image src="/mastercard.png" alt="Mastercard" width={40} height={16} />
//             <Image src="/visa.png" alt="Visa" width={40} height={16} /> */}
//             <FaPaypal/>
//             <SiMastercard />
//             <FaCcVisa />

//           </div>
//         </div>
//       </div>

//       {/* Copyright */}
//       <div className="text-left mt-4 text-gray-600 px-10 mx-20">
//         @ 2024 - Blogy - Designed & Developed by <span className='font-semibold'>VanSon</span>
//       </div>
//     </footer>
//   );
// }


import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterest } from 'react-icons/fa';
import { FaPaypal, FaCcVisa } from "react-icons/fa";
import { SiMastercard } from "react-icons/si";

const categories = [
  'Sắt hộp',
  'Ván gỗ',
  'Lưới B40',
  'Tôn lạnh',
  'Xốp',
  'Ván Symbo',
];

export default function Footer() {
  return (
    <footer className="bg-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            {/* Logo */}
            <div className="w-8 h-8">
              <Image src="/assets/images/LOGO.png" alt="Logo" width={40} height={40} />
            </div>
            <h2 className="text-xl font-semibold">Ngọc Ánh Company</h2>
          </div>
          <p className="text-gray-600">
            Chuyên cung cấp các mặt hàng vật liệu xây dựng uy tín trên thị trường. Nếu có bất kỳ thắc mắc gì vui lòng liên hệ trực tiếp qua hotline hoặc các phương tiện mạng xã hội.
          </p>
        </div>

        {/* Middle Section */}
        <div className="space-y-4">
          <h3 className="font-semibold">CATEGORIES</h3>
          <ul className="grid grid-cols-2 gap-2 text-black">
            {categories.map((category) => (
              <li key={category}>
                <Link href={`/products?category=${encodeURIComponent(category.toLowerCase())}`} className="hover:text-blue-500 hover:underline">
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section */}
        <div className="space-y-4">
          <h3 className="font-semibold">TIN NHẮN</h3>
          <div className="flex space-x-2">
            <input
              type="email"
              placeholder="Your Email"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none w-48"
            />
            <button className="bg-teal-500 text-white px-4 py-2 rounded-lg">
              Subscribe
            </button>
          </div>
          <p className="text-gray-600">
            Hãy nhập gmail của bạn để chúng tôi có thể liên hệ trong thời gian sớm nhất.
          </p>
        </div>
      </div>

      {/* Social Icons & Payment Section */}
      <div className="mt-8 border-t border-gray-200 pt-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <FaFacebookF className="text-gray-500 hover:text-teal-500 cursor-pointer" />
            <FaTwitter className="text-gray-500 hover:text-teal-500 cursor-pointer" />
            <FaInstagram className="text-gray-500 hover:text-teal-500 cursor-pointer" />
            <FaPinterest className="text-gray-500 hover:text-teal-500 cursor-pointer" />
          </div>

          {/* Payment Methods */}
          <div className="flex space-x-4">
            <FaPaypal/>
            <SiMastercard />
            <FaCcVisa />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-left mt-4 text-gray-600 px-10 mx-20">
        @ 2024 - Blogy - Designed & Developed by <span className='font-semibold'>VanSon</span>
      </div>
    </footer>
  );
}
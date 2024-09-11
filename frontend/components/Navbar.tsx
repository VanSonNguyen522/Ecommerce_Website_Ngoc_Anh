// src/components/Navbar.jsx
import React from "react";

const Navbar = () => {
  return (
    <header className="bg-white shadow py-0 w-full top-0 items-center justify-center">
      <div className="bg-gray-100 w-full  mx-auto flex justify-between items-center p-2">
        {/* Logo and Menu */}
        <div className="container mx-auto flex justify-between">
            <div className="flex items-center space-x-2">
            <button className="text-gray-700 lg:hidden">
                <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                ></path>
                </svg>
                </button>
                <img className="w-12 h-12" src = '../../../assets/images/LOGO.png' alt ='Logo' />
                <div className="text-lg font-bold">Ngọc Ánh</div>
            </div>

            {/* Search Bar */}
            <div className="hidden lg:flex items-center space-x-2">
            <input
                type="text"
                placeholder="Search here..."
                className="border rounded-full py-2 px-4 w-80"
            />
            <button className="text-gray-600 hover:text-red-600 duration-200">
                <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
                </svg>
            </button>
            </div>

            <div className="flex items-center space-x-4">
            {/* menu button */}
            <button className="text-gray-600">
                <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h18M3 9h18M3 15h18M3 21h18"
                ></path>
                </svg>
            </button>
            
            {/* account button */}
            <button className="text-gray-600">
                <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                ></path>
                </svg>
            </button>
            </div>
        </div>
      </div>
      {/* Page and contact */}
      <div className = 'container mx-auto flex justify-between items-center p-4'>
            <nav className="hidden lg:flex space-x-4">
                <a href="/" className="text-gray-600 hover:text-blue-600">
                Home
                </a>
                <a href="/product" className="text-gray-600 hover:text-blue-600">
                Product
                </a>
                <a href="/about" className="text-gray-600 hover:text-blue-600">
                About
                </a>
            </nav>
            <span className="text-gray-600 hidden lg:block">Contact: 0914132797</span>
        </div>
    </header>
  );
};

export default Navbar;

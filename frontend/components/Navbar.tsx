"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'; // Updated import for Next.js 13+
import Image from "next/image";
import NavDropDownMenu from "./NavDropDown_menu"; // Make sure the import path is correct

const Navbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    setMounted(true); // Ensure that client-side logic only runs after the component mounts
  }, []);

  const handleNavbarClick = () => {
    setOpenNav(!openNav);
  };

  // const handleSignInClick = () => {
  //   router.push('/signin'); // Navigate to /signin when the button is clicked
  // };
  const handleSignInClick = async () => {
    const isSignedIn = checkIfUserIsSignedIn(); // Replace with your actual sign-in check logic
    
    if (isSignedIn) {
      // Sign out the user
      await signOutUser(); // Replace with your actual sign-out logic
      router.push('/'); // Redirect to home or any other page after signing out
    } else {
      // Sign in the user
      router.push('/signin'); // Navigate to sign-in page
    }
  };
  
  // Example functions for checking sign-in state and signing out
  const checkIfUserIsSignedIn = () => {
    // Implement your logic to check if the user is signed in
    // This could involve checking a cookie, localStorage, or some global state
    return !!localStorage.getItem('userToken'); // Example
  };
  
  const signOutUser = async () => {
    // Implement your logic to sign out the user
    // This could involve clearing cookies, localStorage, or making an API call
    localStorage.removeItem('userToken'); // Example
  };
  

  if (!mounted) {
    // Prevent rendering during SSR
    return null;
  }

  return (
    <header className="bg-white shadow py-0 w-full top-0 items-center justify-center">
      <div className="bg-gray-100 w-full mx-auto flex justify-between items-center p-2">
        {/* Logo and Menu */}
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <button className="text-gray-700 lg:hidden" onClick={handleNavbarClick}>
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
            <img className="w-12 h-12" src="/assets/images/LOGO.png" alt="Logo" />
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
            {/* Menu Button */}
            <button className="text-gray-600 flex items-center">
              <NavDropDownMenu />
            </button>

            {/* Sign-In Button */}
            <button className="text-gray-600" onClick={handleSignInClick}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
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

      {/* Page and Contact */}
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Only render this menu if `openNav` is true */}
        {openNav && (
          <nav className="lg:hidden flex flex-col space-y-4">
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
        )}

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

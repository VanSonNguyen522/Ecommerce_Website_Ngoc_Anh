"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'; 
import { useSession, signOut } from "next-auth/react"; // Import useSession and signOut
import NavDropDownMenu from "./NavDropDown_menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";

const Navbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [message, setMessage] = useState(""); // State for messages
  const router = useRouter();
  const { data: session } = useSession(); // Get session data to check login status

  useEffect(() => {
    setMounted(true); 
  }, []);

  const handleNavbarClick = () => {
    setOpenNav(!openNav);
  };

  // Function to handle user navigation for Sign In, Sign Up, and Logout
  const handleSignInClick = () => {
    router.push('/signin');
  };

  const handleSignUpClick = () => {
    router.push('/signup');
  };

  const handleLogoutClick = async () => {
    if (session) {
      // If the user is logged in, proceed with logout
      await signOutUser();
      // setMessage("You have successfully logged out.");
      toast.success("You have successfully logged out.");
    } else {
      // If the user is not logged in, show a message
      // setMessage("You are not logged in.");
      toast.error("You are not logged in.");
    }

    // Clear the message after 3 seconds and redirect
    setTimeout(() => {
      setMessage("");
      router.push('/');
    }, 3000);
  };

  // Function to sign out user (you might replace this with actual sign-out logic)
  const signOutUser = async () => {
    await signOut({ redirect: false }); // Use NextAuth signOut function
    // You can also clear local storage or handle other sign-out processes here
  };

  if (!mounted) {
    return null;
  }

  return (
    <header className="bg-white shadow py-0 w-full top-0 items-center justify-center">
      <div className="bg-gray-100 w-full mx-auto flex justify-between items-center p-2">
        {/* Logo and Menu */}
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <button className="text-gray-700 lg:hidden" onClick={handleNavbarClick}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
            <img className="w-12 h-12" src="/assets/images/LOGO.png" alt="Logo" />
            <div className="text-lg font-bold">Ngọc Ánh</div>
          </div>

          <div className="hidden lg:flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search here..."
              className="border rounded-full py-2 px-4 w-80"
            />
            <button className="text-gray-600 hover:text-red-600 duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            {/* Menu Button */}
            <button className="text-gray-600 flex items-center">
              <NavDropDownMenu />
            </button>

            {/* Dropdown Menu for Account Actions */}
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                  </svg>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex flex-col w-[150px] h-auto text-2xl items-center">
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignInClick}>Sign In</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignUpClick}>Sign Up</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogoutClick}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded absolute top-16 right-10" role="alert">
          <span className="block sm:inline">{message}</span>
        </div>
      )}

      {/* Page and Contact */}
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Conditional Rendering of Mobile Menu */}
        {openNav && (
          <nav className="lg:hidden flex flex-col space-y-4">
            <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
            <a href="/product" className="text-gray-600 hover:text-blue-600">Product</a>
            <a href="/about" className="text-gray-600 hover:text-blue-600">About</a>
          </nav>
        )}

        <nav className="hidden lg:flex space-x-4">
          <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
          <a href="/product" className="text-gray-600 hover:text-blue-600">Product</a>
          <a href="/about" className="text-gray-600 hover:text-blue-600">About</a>
        </nav>
        <span className="text-gray-600 hidden lg:block">Contact: 0914132797</span>
      </div>
    </header>
  );
};

export default Navbar;

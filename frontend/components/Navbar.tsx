"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession, signOut } from "next-auth/react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  useEffect(() => {
    setMounted(true);
    // Lấy search term từ URL khi component mount
    const urlSearchTerm = searchParams.get('name');
    if (urlSearchTerm) {
      setSearchTerm(urlSearchTerm);
    }
  }, [searchParams]);

  const handleNavbarClick = () => {
    setOpenNav(!openNav);
  };

  // Xử lý tìm kiếm
  const handleSearch = () => {
    if (searchTerm.trim().length < 3) {
      toast.error('Please enter at least 3 characters to search');
      return;
    }
    router.push(`/products?name=${encodeURIComponent(searchTerm.trim())}`);
  };

  // Xử lý khi nhấn Enter trong ô tìm kiếm
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSignInClick = () => {
    router.push('/signin');
  };

  const handleSignUpClick = () => {
    router.push('/signup');
  };

  const handleLogoutClick = async () => {
    if (session) {
      await signOut({ redirect: false });
      toast.success("You have successfully logged out.");
    } else {
      toast.error("You are not logged in.");
    }

    setTimeout(() => {
      router.push('/');
    }, 3000);
  };

  if (!mounted) {
    return null;
  }

  return (
    <header className="bg-white shadow py-0 w-full top-0 items-center justify-center">
      <div className="bg-gray-100 w-full mx-auto flex justify-between items-center p-2">
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              className="text-gray-600 hover:text-red-600 duration-200"
              onClick={handleSearch}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-gray-600 flex items-center">
              <NavDropDownMenu />
            </button>

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

      <div className="container mx-auto flex justify-between items-center p-4">
        {openNav && (
          <nav className="lg:hidden flex flex-col space-y-4">
            <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
            <a href="/product" className="text-gray-600 hover:text-blue-600">Product</a>
            <a href="/cart" className="text-gray-600 hover:text-blue-600">Cart</a>
          </nav>
        )}

        <nav className="hidden lg:flex space-x-4">
          <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
          <a href="/products" className="text-gray-600 hover:text-blue-600">Product</a>
          <a href="/cart" className="text-gray-600 hover:text-blue-600">Cart</a>
        </nav>
        <span className="text-gray-600 hidden lg:block">Contact: 0914132797</span>
      </div>
    </header>
  );
};

export default Navbar;

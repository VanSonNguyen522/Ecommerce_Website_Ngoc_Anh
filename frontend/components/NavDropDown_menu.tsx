import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavDropDownMenu = () => {
  const router = useRouter()

  const handleDashboardClick = () => {
    router.push('/dashboard'); // Navigate to the dashboard
  };
  const handleHomaPageClick = () => {
    router.push('/');
  }
  const handleProductPageClick = () => {
    router.push('/product');
  }
  const handleAboutPageClick = () => {
    router.push('/about')
  }
  return (
    <div>
      <DropdownMenu>
        {/* Use `asChild` to avoid extra HTML elements */}
        <DropdownMenuTrigger asChild>
          <Image
              className="mx-auto items-center"
              src='/assets/icons/menu.svg'
              width={32}
              height={32}
              alt="menu"
            />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col w-[150px] h-auto text-2xl items-center">
          <DropdownMenuLabel>Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleHomaPageClick}>Home</DropdownMenuItem>
          <DropdownMenuItem onClick={handleProductPageClick}>Product</DropdownMenuItem>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={handleAboutPageClick}>About</DropdownMenuItem>
          <DropdownMenuItem>Contact</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuItem onClick={handleDashboardClick}>Dashboard</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavDropDownMenu;

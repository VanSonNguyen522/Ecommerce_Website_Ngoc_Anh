import React from 'react';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavDropDownMenu = () => {
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
          <DropdownMenuItem>Home</DropdownMenuItem>
          <DropdownMenuItem>Product</DropdownMenuItem>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>About</DropdownMenuItem>
          <DropdownMenuItem>Contact</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavDropDownMenu;

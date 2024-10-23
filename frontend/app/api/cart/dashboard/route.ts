// app/api/cart/dashboard/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';

// Định nghĩa interface UserCart với thông tin cần thiết
interface UserCart {
  userId: string;
  userName: string;
  totalAmount: number;
  items: {
    productId: string; // Chỉ lấy id của sản phẩm
    productName: string; // Chỉ lấy name của sản phẩm
    quantity: number;
  }[];
}

export async function GET(request: Request) {
  try {
    const carts = await prisma.cart.findMany({
      include: {
        items: {
          include: {
            product: true, // Bao gồm chi tiết sản phẩm
          },
        },
        user: true, // Bao gồm thông tin người dùng
      },
    });

    // Chuyển đổi dữ liệu thành cấu trúc UserCart
    const userCarts: UserCart[] = carts.map(cart => ({
      userId: cart.userId,
      userName: cart.user?.name || 'Unknown User', // Sử dụng optional chaining để tránh lỗi
      totalAmount: cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0),
      items: cart.items.map(item => ({
        productId: item.product.id, // Chỉ lấy id sản phẩm
        productName: item.product.name, // Chỉ lấy name sản phẩm
        quantity: item.quantity, // Lưu số lượng
      })),
    }));

    return NextResponse.json(userCarts);
  } catch (error) {
    console.error('Error fetching carts:', error);
    return NextResponse.json({ error: 'Failed to fetch carts' }, { status: 500 });
  }
}

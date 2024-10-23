import { NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';

export async function PUT(request: Request) {
    try {
      const body = await request.json();
      const { itemId, quantity } = body;
  
      if (quantity < 1) {
        // Delete item if quantity is less than 1
        await prisma.cartItem.delete({
          where: { id: itemId },
        });
      } else {
        // Update item quantity
        await prisma.cartItem.update({
          where: { id: itemId },
          data: { quantity },
        });
      }
  
      return NextResponse.json({ message: 'Cart updated successfully' });
    } catch (error) {
      console.error('Error updating cart:', error);
      return NextResponse.json(
        { error: 'Failed to update cart' },
        { status: 500 }
      );
    }
  }
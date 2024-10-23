import { NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/AuthOptions';

// Xóa giỏ hàng và các mục trong giỏ hàng
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 401 }
      );
    }

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'Cart ID is required' },
        { status: 400 }
      );
    }

    // Kiểm tra cart tồn tại
    const existingCart = await prisma.cart.findUnique({
      where: { id }
    });

    if (!existingCart) {
      return NextResponse.json(
        { error: 'Cart not found' },
        { status: 404 }
      );
    }

    // Xóa các cart items trước
    await prisma.cartItem.deleteMany({
      where: { cartId: id }
    });

    // Xóa cart
    await prisma.cart.delete({
      where: { id }
    });

    return NextResponse.json({
      message: 'Cart and all its items deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting cart:', error);
    return NextResponse.json(
      { error: 'Failed to delete cart' },
      { status: 500 }
    );
  }
}

// Cập nhật trạng thái giao hàng của giỏ hàng
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 401 }
      );
    }

    const { id } = params;
    const { deliveryStatus } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Cart ID is required' },
        { status: 400 }
      );
    }

    if (typeof deliveryStatus !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid delivery status' },
        { status: 400 }
      );
    }

    // Chỉ cập nhật isDelivered
    const updatedCart = await prisma.cart.update({
      where: { id },
      data: {
        isDelivered: deliveryStatus
      }
    });

    return NextResponse.json({
      message: 'Delivery status updated successfully',
      cart: updatedCart
    });

  } catch (error) {
    console.error('Error updating delivery status:', error);
    return NextResponse.json(
      { error: 'Failed to update delivery status' },
      { status: 500 }
    );
  }
}
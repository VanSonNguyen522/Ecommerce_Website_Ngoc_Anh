// app/api/products/[productId]/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { productId: string } }) {
    const { productId } = params;
    console.log(productId)
  
    try {
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });
  
      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
  
      return NextResponse.json(product, { status: 200 });
    } catch (error) {
      console.error('Error fetching product:', error);
      return NextResponse.json({ error: 'Failed to retrieve product' }, { status: 500 });
    }
  }
  

export async function PUT(request: Request, { params }: { params: { productId: string } }) {
  const { productId } = params;
  const data = await request.json(); // Lấy dữ liệu từ body yêu cầu

  try {
    // Cập nhật sản phẩm
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: { ...data }, // Cập nhật dữ liệu với những gì đã gửi
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}


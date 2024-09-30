import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handle POST requests (tạo sản phẩm)
export async function POST(req: Request) {
  try {
    const { name, description, price } = await req.json();

    const product = await prisma.product.create({
      data: { name, description, price: parseFloat(price) },
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
  }
}

// Handle GET requests (lấy tất cả sản phẩm)
export async function GET() {
  try {
    const products = await prisma.product.findMany(); // Lấy tất cả sản phẩm
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('id'); // Lấy ID từ query string (id sẽ là string)

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    // Xóa sản phẩm dựa vào productId (là string)
    await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting product' }, { status: 500 });
  }
}


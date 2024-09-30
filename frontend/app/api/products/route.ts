import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handle POST requests (tạo sản phẩm)
export async function POST(req: Request) {
  try {
    const { name, description, price, image } = await req.json();

    // Kiểm tra sản phẩm có cùng tên, giá và mô tả hay không
    const existingProduct = await prisma.product.findFirst({
      where: {
        name: name,
        price: parseFloat(price),
        description: description,
      },
    });

    // Nếu sản phẩm đã tồn tại, trả về thông báo lỗi
    if (existingProduct) {
      return NextResponse.json({ error: 'Product with the same name, price, and description already exists.' }, { status: 409 });
    }

    // Nếu không tồn tại, tạo sản phẩm mới
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        image,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
  }
}


// Handle GET requests (lấy tất cả sản phẩm)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name') || ''; // Lấy tên sản phẩm từ query string
    const price = searchParams.get('price'); // Lấy giá sản phẩm từ query string

    let products;

    const whereConditions: any = {}; // Khởi tạo đối tượng điều kiện tìm kiếm

    // Nếu có tên, thêm điều kiện tìm kiếm theo tên
    if (name) {
      whereConditions.name = {
        equals: name, // Tìm kiếm theo tên chính xác
        mode: 'insensitive', // Tìm kiếm không phân biệt chữ hoa chữ thường
      };
    }

    // Nếu có giá, thêm điều kiện tìm kiếm theo giá
    if (price) {
      const parsedPrice = parseFloat(price);
      if (!isNaN(parsedPrice)) {
        whereConditions.price = {
          equals: parsedPrice, // Tìm kiếm theo giá chính xác
        };
      }
    }

    // Lấy danh sách sản phẩm với các điều kiện đã chỉ định
    products = await prisma.product.findMany({
      where: whereConditions,
    });

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


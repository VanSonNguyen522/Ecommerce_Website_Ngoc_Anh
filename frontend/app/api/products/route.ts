import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { 
      name, 
      description, 
      price, 
      image, 
      category, 
      status, 
      isNew, 
      isOnSale 
    } = await req.json();

    // Kiểm tra sản phẩm có cùng tên, giá và mô tả hay không
    const existingProduct = await prisma.product.findFirst({
      where: {
        name,
        price: parseFloat(price),
        description,
      },
    });

    // Nếu sản phẩm đã tồn tại, trả về thông báo lỗi
    if (existingProduct) {
      return NextResponse.json(
        { error: 'Product with the same name, price, and description already exists.' }, 
        { status: 409 }
      );
    }

    // Nếu không tồn tại, tạo sản phẩm mới
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        image,
        category, // Include category
        status: status || null, // Allow status to be optional
        isNew: isNew || false, // Default to false if not provided
        isOnSale: isOnSale || false, // Default to false if not provided
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json(
      { error: 'Error creating product' }, 
      { status: 500 }
    );
  }
}




// Hàm xử lý yêu cầu GET (lấy danh sách sản phẩm)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name') || '';
    const price = searchParams.get('price');
    const category = searchParams.get('category') || ''; // Get the category parameter

    let whereConditions: any = {};

    // Update the condition for searching by name
    if (name) {
      // Use contains condition for name search to accommodate partial matches
      whereConditions.name = { contains: name, mode: 'insensitive' };
    }

    // Update the condition for searching by price
    if (price) {
      const parsedPrice = parseFloat(price);
      if (!isNaN(parsedPrice)) {
        whereConditions.price = parsedPrice;
      }
    }

    // Update the condition for searching by category
    if (category) {
      whereConditions.category = { equals: category }; // Exact match for category
    }

    const products = await prisma.product.findMany({ where: whereConditions });
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching product list:', error);
    return NextResponse.json({ error: 'Error fetching product list' }, { status: 500 });
  }
}



// Hàm xử lý yêu cầu DELETE (xóa sản phẩm)
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('id');

    if (!productId) {
      return NextResponse.json({ error: 'Cần cung cấp ID sản phẩm' }, { status: 400 });
    }

    await prisma.product.delete({ where: { id: productId } });
    return NextResponse.json({ message: 'Đã xóa sản phẩm thành công' });
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm:', error);
    return NextResponse.json({ error: 'Lỗi khi xóa sản phẩm' }, { status: 500 });
  }
}

// export async function PUT(request: Request, { params }: { params: { productId: string } }) {
//   const { productId } = params; // Lấy productId từ params
//   const body = await request.json(); // Phân tích JSON từ body yêu cầu

//   try {
//     const updatedProduct = await prisma.product.update({
//       where: { id: productId }, // Cập nhật sản phẩm theo ID
//       data: {
//         name: body.name || undefined,
//         description: body.description || undefined,
//         price: body.price !== undefined ? parseFloat(body.price) : undefined,
//         image: body.image || undefined,
//         category: body.category || undefined,
//         status: body.status || undefined,
//         isNew: body.isNew !== undefined ? body.isNew : undefined,
//         isOnSale: body.isOnSale !== undefined ? body.isOnSale : undefined,
//       },
//     });

//     return NextResponse.json(updatedProduct, { status: 200 }); // Trả về sản phẩm đã cập nhật
//   } catch (error) {
//     console.error('Error updating product:', error); // Ghi lại lỗi
//     return NextResponse.json({ error: 'Failed to update product' }, { status: 500 }); // Trả về lỗi
//   }
// }
// import { NextRequest, NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const name = searchParams.get('name') || '';
//     const price = searchParams.get('price');
//     const category = searchParams.get('category') || '';

//     let whereConditions: any = {};

//     if (name) {
//       whereConditions.name = { contains: name, mode: 'insensitive' };
//     }
//     if (price) {
//       const parsedPrice = parseFloat(price);
//       if (!isNaN(parsedPrice)) {
//         whereConditions.price = parsedPrice;
//       }
//     }
//     if (category) {
//       whereConditions.category = { equals: category };
//     }

//     const products = await prisma.product.findMany({ where: whereConditions });
//     return NextResponse.json(products);
//   } catch (error) {
//     console.error('Error fetching product list:', error);
//     return NextResponse.json({ error: 'Error fetching product list' }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name')?.trim() || ''; // Trim để loại bỏ khoảng trắng
    const category = searchParams.get('category')?.trim() || '';

    let whereConditions: any = {};

    if (name && category) {
      // Trả về lỗi nếu cả hai đều có
      return NextResponse.json(
        { error: 'Only one search parameter is allowed: either name or category.' },
        { status: 400 }
      );
    }

    if (name) {
      whereConditions.name = { contains: name, mode: 'insensitive' };
    } else if (category) {
      whereConditions.category = category.toLowerCase(); // Chuyển đổi thành chữ thường để khớp với database
    }

    // Nếu cả hai đều rỗng, trả về tất cả sản phẩm
    if (!name && !category) {
      const products = await prisma.product.findMany();
      return NextResponse.json(products);
    }

    const products = await prisma.product.findMany({ where: whereConditions });
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching product list:', error);
    return NextResponse.json({ error: 'Error fetching product list' }, { status: 500 });
  }
}

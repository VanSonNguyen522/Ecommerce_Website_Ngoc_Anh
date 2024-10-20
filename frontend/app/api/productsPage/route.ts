// import { NextRequest, NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const name = searchParams.get('name')?.trim() || ''; // Trim để loại bỏ khoảng trắng
//     const category = searchParams.get('category')?.trim() || '';

//     let whereConditions: any = {};

//     if (name && category) {
//       // Trả về lỗi nếu cả hai đều có
//       return NextResponse.json(
//         { error: 'Only one search parameter is allowed: either name or category.' },
//         { status: 400 }
//       );
//     }

//     if (name) {
//       whereConditions.name = { contains: name, mode: 'insensitive' };
//     } else if (category) {
//       whereConditions.category = category.toLowerCase(); // Chuyển đổi thành chữ thường để khớp với database
//     }

//     // Nếu cả hai đều rỗng, trả về tất cả sản phẩm
//     if (!name && !category) {
//       const products = await prisma.product.findMany();
//       return NextResponse.json(products);
//     }

//     const products = await prisma.product.findMany({ where: whereConditions });
//     return NextResponse.json(products);
//   } catch (error) {
//     console.error('Error fetching product list:', error);
//     return NextResponse.json({ error: 'Error fetching product list' }, { status: 500 });
//   }
// }

// import { NextRequest, NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const search = searchParams.get('search')?.trim() || '';
//     const category = searchParams.get('category')?.trim().toLowerCase() || '';

//     console.log('Search params:', { search, category }); // Log search params

//     let whereConditions: any = {};

//     if (search) {
//       whereConditions.name = { contains: search, mode: 'insensitive' };
//     }

//     if (category) {
//       whereConditions.category = category;
//     }

//     console.log('Where conditions:', whereConditions); // Log where conditions

//     const products = await prisma.product.findMany({ where: whereConditions });
    
//     console.log('Products found:', products.length); // Log number of products found

//     if (products.length === 0) {
//       return NextResponse.json({ message: 'No products found' }, { status: 204 });
//     }

//     return NextResponse.json(products);
//   } catch (error) {
//     console.error('Error fetching product list:', error);
//     return NextResponse.json({ error: 'Error fetching product list' }, { status: 500 });
//   } finally {
//     await prisma.$disconnect(); // Ensure Prisma client is disconnected
//   }
// }

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Product } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  console.log('API route called');
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name') || '';
    const category = searchParams.get('category') || '';

    console.log('Received name:', name);
    console.log('Received category:', category);

    let whereConditions: {
      name?: { contains: string; mode: 'insensitive' };
      category?: { equals: string; mode: 'insensitive' };
    } = {};

    // Apply the name condition without the minimum length check
    if (name) {
      whereConditions.name = {
        contains: name.trim(),
        mode: 'insensitive',
      };
    }

    if (category && category.trim() !== '') {
      whereConditions.category = {
        equals: category.trim(),
        mode: 'insensitive',
      };
    }

    console.log('Where conditions:', JSON.stringify(whereConditions));

    let products: Product[];
    console.log('Executing Prisma query...');
    if (Object.keys(whereConditions).length > 0) {
      products = await prisma.product.findMany({
        where: whereConditions,
      });
    } else {
      console.log('No search conditions, fetching all products');
      products = await prisma.product.findMany();
    }

    console.log('Query completed. Number of products:', products.length);
    console.log('First product (if any):', products[0]);

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching product list:', error);
    return NextResponse.json({ error: 'Error fetching product list' }, { status: 500 });
  } finally {
    console.log('API route execution completed');
  }
}

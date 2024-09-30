// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function POST(req: Request) {
//   try {
//     const { name, description, price } = await req.json();
    
//     const product = await prisma.product.create({
//       data: { name, description, price: parseFloat(price) },
//     });

//     return NextResponse.json(product);
//   } catch (error) {
//     return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handle POST requests
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

// You can add other methods like GET, PUT, DELETE if needed.

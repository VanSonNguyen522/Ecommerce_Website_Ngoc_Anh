// import { NextResponse } from 'next/server';
// import prisma from '@/libs/prismadb';

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { userId, productId, quantity = 1 } = body;

//     // Check if cart exists for user
//     let cart = await prisma.cart.findFirst({
//       where: { userId },
//       include: {
//         items: true,
//       },
//     });

//     // If no cart exists, create one
//     if (!cart) {
//       cart = await prisma.cart.create({
//         data: {
//           userId,
//           items: {
//             create: [{
//               productId,
//               quantity,
//             }]
//           }
//         },
//       });
//     } else {
//       // Check if item already exists in cart
//       const existingItem = cart.items.find(item => item.productId === productId);

//       if (existingItem) {
//         // Update existing item quantity
//         await prisma.cartItem.update({
//           where: { id: existingItem.id },
//           data: { quantity: existingItem.quantity + quantity },
//         });
//       } else {
//         // Add new item to cart
//         await prisma.cartItem.create({
//           data: {
//             cartId: cart.id,
//             productId,
//             quantity,
//           },
//         });
//       }
//     }

//     return NextResponse.json({ message: 'Item added to cart successfully' });
//   } catch (error) {
//     console.error('Error adding item to cart:', error);
//     return NextResponse.json(
//       { error: 'Failed to add item to cart' },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const userId = searchParams.get('userId');

//     if (!userId) {
//       return NextResponse.json(
//         { error: 'User ID is required' },
//         { status: 400 }
//       );
//     }

//     const cart = await prisma.cart.findFirst({
//       where: { userId },
//       include: {
//         items: true,
//       },
//     });

//     if (!cart) {
//       return NextResponse.json({ items: [] });
//     }

//     // Fetch product details for each cart item
//     const cartWithProducts = await Promise.all(
//       cart.items.map(async (item) => {
//         const product = await prisma.product.findUnique({
//           where: { id: item.productId },
//         });
//         return {
//           ...item,
//           product,
//         };
//       })
//     );

//     return NextResponse.json({
//       ...cart,
//       items: cartWithProducts,
//     });
//   } catch (error) {
//     console.error('Error fetching cart:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch cart' },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, productId, quantity = 1 } = body;

    // Check if cart exists for user
    let cart = await prisma.cart.findFirst({
      where: { userId },
      include: {
        items: true,
      },
    });

    // If no cart exists, create one
    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId,
          items: {
            create: [{
              productId,
              quantity,
            }]
          }
        },
        include: {  // Add this include statement
          items: true,
        },
      });
    } else {
      // Check if item already exists in cart
      const existingItem = cart.items.find(item => item.productId === productId);

      if (existingItem) {
        // Update existing item quantity
        await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + quantity },
        });
      } else {
        // Add new item to cart
        await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId,
            quantity,
          },
        });
      }

      // Fetch updated cart after modifications
      cart = await prisma.cart.findFirst({
        where: { userId },
        include: {
          items: true,
        },
      });
    }

    return NextResponse.json({ message: 'Item added to cart successfully', cart });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return NextResponse.json(
      { error: 'Failed to add item to cart' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const cart = await prisma.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,  // Include product details directly in the query
          },
        },
      },
    });

    if (!cart) {
      return NextResponse.json({ items: [] });
    }

    return NextResponse.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}
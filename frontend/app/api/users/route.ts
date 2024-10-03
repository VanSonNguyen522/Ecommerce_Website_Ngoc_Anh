
import { NextResponse } from 'next/server';
import prismadb from "@/libs/prismadb";
import bcrypt from "bcrypt"
// GET - Fetch users or search by email
// export async function GET(req: Request) {
//   try {
//     // Extract the search email from the request URL query params
//     const { searchParams } = new URL(req.url);
//     const email = searchParams.get('email');

//     // If an email is provided in the query params, search by email
//     const users = await prismadb.user.findMany({
//       where: {
//         role: 'user', // Optional: Only get users with role "user"
//         ...(email && { email }), // Apply email filter only if it's provided
//       },
//     });

//     return NextResponse.json(users);
//   } catch (error) {
//     return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
//   }
// }

export async function GET(req: Request) {
  try {
    // Extract the search email from the request URL query params
    const { searchParams } = new URL(req.url);
    const emailSearch = searchParams.get('email');

    if (emailSearch) {
      // Check the length of the search term
      const searchLength = emailSearch.length;

      // If search length is 4 or more, return emails containing the search term
      if (searchLength >= 4) {
        const matchingUsers = await prismadb.user.findMany({
          where: {
            role: 'user', // Optional: Only get users with role "user"
            email: {
              contains: emailSearch, // Match any part of the email that contains the search term
              mode: 'insensitive', // Optional: case-insensitive search
            },
          },
        });

        return NextResponse.json(matchingUsers);
      } else {
        // If less than 4 characters, fetch users with emails that start with those characters
        const partialMatchUsers = await prismadb.user.findMany({
          where: {
            role: 'user', // Optional: Only get users with role "user"
            email: { startsWith: emailSearch }, // Match by starting characters
          },
        });

        return NextResponse.json(partialMatchUsers);
      }
    } else {
      // If no email is provided, fetch all users
      const allUsers = await prismadb.user.findMany({
        where: {
          role: 'user', // Optional: Only get users with role "user"
        },
      });

      return NextResponse.json(allUsers);
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
  }
}


// POST - Create a new user
export async function POST(req: Request) {
  const { name, email, password, role } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const userAlreadyExist = await prismadb.user.findFirst({ where: { email } });

  if (userAlreadyExist) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await prismadb.user.create({
    data: { name, email, hashedPassword, role }
  });

  return NextResponse.json(newUser);
}

// PUT - Update an existing user by ID
export async function PUT(req: Request) {
  // Extract the id from the URL
  const urlSegments = req.url.split('/');
  const id = urlSegments.pop(); // Get the last part of the URL, which should be the ID

  // Check if id is valid
  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const { name, email, role } = await req.json();

  try {
    const updatedUser = await prismadb.user.update({
      where: { id },
      data: { name, email, role }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating user' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id'); // Get the user ID from query parameters

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Delete the user from the database
    await prismadb.user.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
  }
}
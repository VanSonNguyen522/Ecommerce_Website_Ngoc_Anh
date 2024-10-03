import { NextResponse } from 'next/server';
import prismadb from "@/libs/prismadb";
import bcrypt from "bcrypt"

// export async function GET() {
//   try {
//     // Fetch users where role is 'user' and include those with name as null
//     const users = await prismadb.user.findMany({
//       where: {
//         role: 'user',
//       },
//     });

//     return NextResponse.json(users);
//   } catch (error) {
//     return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
//   }
// }

export async function GET() {
  try {
    const users = await prismadb.user.findMany({
    //   take: 10, // Limit the response to 10 users
      where: {
        role: 'user', // Optional: Only get users with role "user"
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
  }
}


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

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { name, email, role } = await req.json();
  
    const updatedUser = await prismadb.user.update({
      where: { id: params.id },
      data: { name, email, role }
    });
  
    return NextResponse.json(updatedUser);
  }

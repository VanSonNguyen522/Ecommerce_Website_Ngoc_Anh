import { NextResponse } from "next/server"
import prismadb from "../../../libs/prismadb";
import bcrypt from "bcrypt"

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password, name } = body;

        // Validate if all required fields are present
        if (!name || !email || !password) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        // Check if the user already exists
        const userAlreadyExist = await prismadb.user.findFirst({
            where: {
                email: email,
            }
        });

        if (userAlreadyExist?.id) {
            return new NextResponse("User already exists", { status: 409 }); // 409 Conflict
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user
        const newUser = await prismadb.user.create({
            data: {
                name: name,
                email: email,
                hashedPassword: hashedPassword
            }
        });

        return NextResponse.json(newUser);
    } catch (err: any) {
        console.log("REGISTER_ERR: " + err);
        return new NextResponse("Error during registration", { status: 500 });
    }
}

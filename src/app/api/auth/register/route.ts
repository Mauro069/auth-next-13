import { NextRequest, NextResponse } from "next/server";
import { isValidEmail } from "@/utils/isValidEmail";
import User, { IUserSchema } from "@/models/User";
import { connectMongoDB } from "@/libs/mongodb";
import { messages } from "@/utils/messages";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    await connectMongoDB();

    const body = await request.json();
    const { email, password, confirmPassword } = body;

    // Validar que esten todos los campos enviados
    if (!email || !password || !confirmPassword) {
      return NextResponse.json(
        {
          message: messages.error.needProps,
        },
        {
          status: 400,
        }
      );
    }

    // Validar si el email es un email
    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          message: messages.error.emailNotValid,
        },
        {
          status: 400,
        }
      );
    }

    // Validar que las contraseñas sean iguales
    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: messages.error.passwordsNotMatch },
        { status: 400 }
      );
    }

    const userFind = await User.findOne({ email });

    if (userFind) {
      return NextResponse.json(
        { message: messages.error.emailExist },
        { status: 200 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: IUserSchema = new User({
      email,
      password: hashedPassword,
    });

    // @ts-ignore
    const { password: userPass, ...rest } = newUser._doc;

    await newUser.save();

    const token = jwt.sign({ data: rest }, "secreto", {
      expiresIn: 86400,
    });

    const response = NextResponse.json(
      {
        newUser: rest,
        message: messages.success.userCreated,
      },
      {
        status: 200,
      }
    );

    response.cookies.set("auth_cookie", token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: messages.error.default, error },
      { status: 500 }
    );
  }
}

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: number;
  email: string;
  role: string;
}

export async function getUserFromToken(): Promise<TokenPayload | null> {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) return null;

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) throw new Error("JWT_SECRET nije u definisan u .env");

    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    return null; 
  }
}
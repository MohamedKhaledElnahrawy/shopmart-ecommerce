"use server";
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export async function getMyToken() {
  const cookieStore = await cookies();

  const encryptedToken =
    cookieStore.get("next-auth.session-token") || // (Development)
    cookieStore.get("__Secure-next-auth.session-token"); // (Deployment)

  if (!encryptedToken) return null;

  const decoded = await decode({
    token: encryptedToken.value,
    secret: process.env.AUTH_SECRET!,
  });

  if (!decoded) return null;

  return decoded.token as string | null;
}

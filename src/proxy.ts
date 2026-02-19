
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
  });

  const { pathname } = request.nextUrl;

  if (
    !token &&
    (pathname === "/cart" || pathname === "/orders" || pathname === "/wishlist")
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/cart", "/orders", "/wishlist", "/login", "/register"],
};
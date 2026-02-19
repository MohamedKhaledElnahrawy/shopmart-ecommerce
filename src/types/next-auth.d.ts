import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    token?: string;
    user?: {
      name?: string;
      email?: string;
      role?: string;
    };
  }

  interface Session {
    user?: {
      name?: string;
      email?: string;
      role?: string;
    };
    token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      name?: string;
      email?: string;
      role?: string;
    };
    token?: string;
  }
}
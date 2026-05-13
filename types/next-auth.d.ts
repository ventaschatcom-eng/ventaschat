import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      plan: string;
      credits: number;
      isEmailVerified: boolean;
    };
  }

  interface User {
    plan: string;
    credits: number;
    isEmailVerified: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    plan?: string;
    credits?: number;
    isEmailVerified?: boolean;
  }
}

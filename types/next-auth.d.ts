import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      plan: string;
      credits: number;
    };
  }

  interface User {
    plan: string;
    credits: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    plan?: string;
    credits?: number;
  }
}

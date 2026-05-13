import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { getUserByEmail, getUserById } from "@/lib/db";
import { loginSchema } from "@/lib/validations";

export const authConfig = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const parsed = loginSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const user = await getUserByEmail(parsed.data.email.toLowerCase());

        if (!user) {
          return null;
        }

        const isValid = await bcrypt.compare(parsed.data.password, user.passwordHash);

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          plan: user.plan,
          credits: user.credits,
          isEmailVerified: user.emailVerified,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger }) => {
      if (user) {
        token.plan = user.plan;
        token.credits = user.credits;
        token.isEmailVerified = user.isEmailVerified;
      }

      if (token.sub && trigger !== "signIn") {
        const dbUser = await getUserById(token.sub);

        if (dbUser) {
          token.plan = dbUser.plan;
          token.credits = dbUser.credits;
          token.isEmailVerified = dbUser.emailVerified;
        }
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.plan = (token.plan as string) ?? "free";
        session.user.credits = (token.credits as number) ?? 0;
        session.user.isEmailVerified = (token.isEmailVerified as boolean) ?? false;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

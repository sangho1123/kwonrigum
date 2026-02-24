// lib/auth.ts
import { prisma } from "@/lib/db";
import { compare } from "bcryptjs";
import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthConfig = {
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "이메일", type: "email" },
        password: { label: "비밀번호", type: "password" },
      },
      authorize: async (creds) => {
        const email =
          typeof creds?.email === "string" ? creds.email.trim().toLowerCase() : "";
        const password =
          typeof creds?.password === "string" ? creds.password.trim() : "";
      
        if (!email || !password) return null;
      
        const user = await prisma.user.findUnique({
          where: { email },
          select: { id: true, email: true, name: true, role: true, password: true },
        });
        if (!user || !user.password) return null;
      
        const ok = await compare(password, user.password);
        if (!ok) return null;
      
        return {
          id: user.id,
          name: user.name ?? user.email,
          email: user.email,
          role: user.role,
        } as any;
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: import("next-auth/jwt").JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: import("next-auth").Session;
      token: import("next-auth/jwt").JWT;
    }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);

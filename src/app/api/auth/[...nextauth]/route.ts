import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { AuthOptions } from "next-auth";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url === baseUrl || url.startsWith(baseUrl)) {
        return baseUrl;
      }
      return url; 
    },

    async jwt({ token, account, user }) {
      if (account && user) {
        token.id = user.id;
        token.email = user.email ?? null;
        token.name = user.name ?? null;
        token.image = user.image ?? null;
      }
      return token;
    },

    async signIn({ user, account }) {
      try {
        const existingUser = await prisma.user.findFirst({
          where: {
            email: user.email as string,
          },
        });

        if (!existingUser) {
          const { id: userId } = await prisma.user.create({
            data: {
              name: user.name as string,
              email: user.email as string,
              image: user.image as string,
            },
          });

          await prisma.account.create({
            data: {
              userId: userId, 
              provider: account!.provider,
              providerAccountId: account!.providerAccountId,
            },
          });
        }

        return true;
      } catch (error) {
        console.error("Error on signIn:", error);
        return false;
      }
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id ?? null;
        session.user.email = token.email ?? null;
        session.user.name = token.name ?? null;
        session.user.image = token.image ?? null;
      }
    
      return session;
    }
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

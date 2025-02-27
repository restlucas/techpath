import { sendUserDataToBackend } from "@/services/auth.services";
import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import LinkedinProvider from "next-auth/providers/linkedin";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    LinkedinProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, profile, account }) {
      if (user) {
        const username =
          (profile as { login?: string; vanityName?: string }).vanityName ||
          (profile as { login?: string }).login;

        const { user: userData } = await sendUserDataToBackend(
          user,
          account,
          (username as string) || "",
        );

        token.id = userData.id;
        token.email = userData.email;
        token.username = username;
        token.name = userData.name;
        token.image = userData.image;
        token.totalXp = userData.totalXp;
        token.streak = userData.streak;
        token.createdAt = userData.createdAt;
        token.provider = account?.provider;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.username = token.username;
      session.user.name = token.name;
      session.user.image = token.image;
      session.user.totalXp = token.totalXp;
      session.user.streak = token.streak;
      session.user.createdAt = token.createdAt;
      session.user.provider = token.provider;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

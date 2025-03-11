import { sendUserDataToBackend } from "@/services/auth.services";
import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  jwt: {
    maxAge: 60,
  },
  callbacks: {
    async jwt({ token, user, profile, account }) {
      if (user) {
        const emailUsername = profile?.email?.split("@")[0] || "";

        const username = (profile as { login?: string }).login || emailUsername;

        try {
          const { user: userData } = await sendUserDataToBackend(
            user,
            account,
            (username as string) || "",
          );

          token.id = userData.id;
          token.email = userData.email;
          token.username = username;
        } catch (error) {
          console.error("Error sending user data to backend:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.username = token.username;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

import { sendUserDataToBackend } from "@/services/auth.services";
import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import LinkedinProvider, {
  LinkedInProfile,
} from "next-auth/providers/linkedin";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    LinkedinProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      authorization: {
        params: { scope: "openid profile email" },
      },
      issuer: "https://www.linkedin.com",
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      profile: (profile: LinkedInProfile) => ({
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      }),
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
        const username =
          (profile as { login?: string; vanityName?: string }).vanityName ||
          (profile as { login?: string }).login;

        try {
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
          token.following = userData.following;
          token.provider = account?.provider;
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
      session.user.name = token.name;
      session.user.image = token.image;
      session.user.totalXp = token.totalXp;
      session.user.streak = token.streak;
      session.user.following = token.following;
      session.user.createdAt = token.createdAt;
      session.user.provider = token.provider;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

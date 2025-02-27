import { getServerSession } from "next-auth";
import { getSession, signIn } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function updateSession(redirectUrl: string) {
  const session = await getSession();
  const provider = session?.user?.provider;

  await signIn(provider, {
    redirect: false,
    callbackUrl: `/learn/${redirectUrl}`,
  });
}

export async function getServerAuth() {
  const session = await getServerSession(authOptions);
  return session;
}

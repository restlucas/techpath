"use client";
import { signIn, useSession } from "next-auth/react";

import { GithubLogo } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <section className="flex h-screen w-full items-center justify-center bg-[#09090B] px-6">
      <div className="border-gray-dark h-auto w-[500px] rounded-lg border-2 p-6 text-white shadow-md">
        <h1 className="text-center text-3xl font-bold">techpath</h1>

        <h1 className="mt-6 text-2xl font-bold">Login</h1>
        <p className="text-sm">Utilize o método abaixo</p>

        <button
          onClick={() => signIn("github")}
          className="mt-10 flex h-auto w-full items-center justify-center gap-2 rounded-lg bg-white p-2 duration-200 hover:bg-white/50"
        >
          <GithubLogo size={24} weight="bold" className="fill-black" />
          <span className="font-semibold text-black">GitHub</span>
        </button>
      </div>
    </section>
  );
}

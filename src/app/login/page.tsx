"use client";
import { signIn, useSession } from "next-auth/react";

import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
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
    <section className="flex h-screen w-full items-center justify-center bg-dark px-6">
      <div className="h-auto w-[500px] rounded-lg p-6 text-white">
        <h1 className="text-center text-3xl font-bold text-blue">techpath</h1>

        <h1 className="mt-6 text-2xl font-bold">Login</h1>
        <p className="text-sm">Utilize um dos métodos abaixo</p>

        <div className="mt-10 flex flex-col gap-4">
          <button
            onClick={() => signIn("linkedin")}
            className="group flex h-auto w-full items-center justify-center gap-2 rounded-lg border-2 border-border p-3 text-blue duration-200 hover:bg-selected"
          >
            <LinkedinLogo
              size={24}
              weight="fill"
              className="fill-border duration-200 group-hover:fill-white"
            />
            <span className="font-semibold">LinkedIn</span>
          </button>

          <button
            onClick={() => signIn("github")}
            className="group flex h-auto w-full items-center justify-center gap-2 rounded-lg border-2 border-border p-3 text-blue duration-200 hover:bg-selected"
          >
            <GithubLogo
              size={24}
              weight="fill"
              className="fill-border duration-200 group-hover:fill-white"
            />
            <span className="font-semibold">GitHub</span>
          </button>
        </div>

        <p className="mt-10 text-center text-xs text-white/50">
          Ao entrar no techpath, você concorda com os nossos{" "}
          <span className="cursor-pointer font-bold duration-200 hover:text-blue">
            Termos e Política de Privacidade
          </span>
          .
        </p>
      </div>
    </section>
  );
}

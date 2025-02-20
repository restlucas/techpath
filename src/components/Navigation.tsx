"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    href: "/learn",
    title: "Aprender",
  },
  {
    href: "/challenges",
    title: "Desafios",
  },
  {
    href: "/quests",
    title: "Missões",
  },
  {
    href: "/leaderboards",
    title: "Leaderboard",
  },
  {
    href: "/profile/restlucas",
    title: "Perfil",
  },
  {
    href: "/settings",
    title: "Configurações",
  },
];

function Aside({ pathname }: { pathname: string }) {
  return (
    <aside className="relative flex h-screen min-w-[256px] flex-col items-center justify-start gap-8 px-4 py-8">
      <h1 className="w-full text-center text-3xl font-extrabold">techpath</h1>

      <nav className="flex h-full w-full flex-col gap-3 text-sm font-bold uppercase">
        {navigation.map((link, index) => {
          return (
            <Link
              key={index}
              href={link.href}
              className={`flex cursor-pointer items-center justify-start gap-2 rounded-xl border-2 px-4 py-3 duration-200 hover:bg-selected ${
                pathname === link.href
                  ? "border-selected bg-selected text-selected"
                  : "border-transparent"
              }`}
            >
              <span className="">{link.title}</span>
            </Link>
          );
        })}

        <button className="mt-auto flex cursor-pointer items-center justify-start gap-2 rounded-md px-4 py-3 duration-200">
          <span className="">Sair</span>
        </button>
      </nav>
    </aside>
  );
}

export function Navigation() {
  const pathname = usePathname();

  return <Aside pathname={pathname} />;
}

"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

function Aside({ pathname }: { pathname: string }) {
  const { data } = useSession();
  const t = useTranslations();

  const links = [
    { href: "/learn", labelKey: "navigation.learn" },
    { href: "/missions", labelKey: "navigation.missions" },
    { href: "/leaderboard", labelKey: "navigation.leaderboard" },
    { href: `/profile/${data?.user.username}`, labelKey: "navigation.profile" },
    { href: "/settings", labelKey: "navigation.settings" },
  ];

  return (
    <aside className="relative flex h-screen min-w-[256px] flex-col items-center justify-start gap-8 px-4 py-8">
      <h1 className="w-full text-center text-3xl font-extrabold">techpath</h1>

      <nav className="flex h-full w-full flex-col gap-3 text-sm font-bold uppercase">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`flex cursor-pointer items-center justify-start gap-2 rounded-xl border-2 px-4 py-3 duration-200 hover:bg-selected ${
              pathname.includes(link.href)
                ? "border-blue bg-selected text-blue"
                : "border-transparent"
            }`}
          >
            <span>{t(link.labelKey)}</span>
          </Link>
        ))}

        <button
          onClick={() => signOut()}
          className="mt-auto flex cursor-pointer items-center justify-start gap-2 rounded-xl border-2 px-4 py-3 duration-200 hover:bg-selected"
        >
          <span className="font-bold uppercase">{t("navigation.exit")}</span>
        </button>
      </nav>
    </aside>
  );
}

export function Navigation() {
  const pathname = usePathname();

  return <Aside pathname={pathname} />;
}

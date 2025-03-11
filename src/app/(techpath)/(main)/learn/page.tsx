import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { GET_TRAILS } from "@/graphql/queries/trail.queries";
import { Metadata } from "next";
import { createApolloClient } from "@/lib/apolloClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type Trail = {
  id: string;
  slug: string;
  name: string;
  description: string;
  tags: string;
};

export const metadata: Metadata = {
  title: "aprender | techpath",
};

export default async function LearnPage() {
  const session = await getServerSession(authOptions);
  const client = createApolloClient(session);

  const t = await getTranslations("learn");

  const {
    data: { trails: trailsResponse },
  } = await client.query({
    query: GET_TRAILS,
  });

  const trails = trailsResponse.data;

  return (
    <section>
      <h1 className="text-4xl font-bold">{t("title")}</h1>
      <p className="mt-2 text-sm">{t("subtitle")}</p>

      <div className="mt-10 grid grid-cols-1 gap-4 min-[900px]:grid-cols-2 min-[1200px]:grid-cols-3">
        {trails.map((trail: Trail) => {
          return (
            <Link
              key={trail.id}
              href={`/learn/${trail.slug}`}
              className={`group relative cursor-pointer overflow-hidden rounded-lg border-2 border-border p-6 shadow-md transition-all duration-200 hover:scale-105 hover:border-blue hover:bg-selected`}
            >
              <div className="relative z-20 flex flex-col">
                <div className="flex items-center justify-between gap-6">
                  <h2 className="text-xl font-bold duration-200 group-hover:text-blue">
                    {trail.name}
                  </h2>
                </div>
                <p className="mt-4 text-xs">{trail.description}</p>

                <div className="mt-6 flex w-full select-none flex-wrap items-center justify-start gap-1">
                  {trail.tags.split(",").map((tag, index) => {
                    return (
                      <div
                        key={index}
                        className="rounded-2xl border-2 border-border px-3 py-1 text-center text-xs"
                      >
                        {tag}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="absolute right-5 top-5 z-10">
                <Image
                  src={`/assets/${trail.slug}.svg`}
                  alt="Icon"
                  width={80}
                  height={80}
                  className="opacity-10"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

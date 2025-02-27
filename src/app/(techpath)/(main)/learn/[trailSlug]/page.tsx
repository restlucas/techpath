"use client";

import { GET_TRAIL } from "@/graphql/queries/trail.queries";
import { clearLesson } from "@/redux/slices/lessonSlice";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { use, useEffect } from "react";
import { useDispatch } from "react-redux";

type Base = {
  id: string;
  name: string;
  description: string;
};

type Topic = Base & {
  slug: string;
  totalLessons: number;
  totalLessonsCompleted: number;
  totalXp: number;
};

type Module = Base & {
  topics: Topic[];
};

type Trail = {
  id: string;
  name: string;
  description: string;
  tags: string;
  modules: Module[];
};

function TrailContent({ modules }: { modules: Module[] }) {
  return (
    <div className="mt-20 flex h-auto w-full flex-col gap-24">
      {modules.map((module, index) => {
        return (
          <div key={index} className="flex flex-col">
            <div className="flex items-center justify-start gap-4">
              <h1 className="text-2xl font-bold text-blue">{module.name}</h1>
            </div>
            <div className="group relative">
              <div className="mt-8">
                <div className="m-auto mt-4 w-full">
                  <div className="grid w-full grid-cols-3 gap-4">
                    {module.topics.map((topic, index) => {
                      const isTopicCompleted =
                        topic.totalLessons === topic.totalLessonsCompleted;

                      return (
                        <Link
                          key={index}
                          href={`/lesson/${topic.slug}`}
                          className={`relative h-[100px] w-full cursor-pointer select-none items-center rounded-lg border-2 border-border bg-dark p-4 duration-200 hover:scale-105 hover:border-blue hover:text-blue ${isTopicCompleted ? "pointer-events-none cursor-not-allowed border-green-600 bg-green-600 line-through" : ""}`}
                        >
                          <h1 className="text-base font-bold">{topic.name}</h1>
                          <p className="text-xs">{topic.totalXp} xp</p>

                          <span className="absolute bottom-4 right-4 text-xs font-bold">
                            Lições ({topic.totalLessonsCompleted}/
                            {topic.totalLessons})
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function TrailPage({
  params,
}: {
  params: Promise<{ trailSlug: string }>;
}) {
  const { trailSlug } = use(params);
  const { data } = useQuery(GET_TRAIL, {
    variables: { trailSlug: trailSlug },
    fetchPolicy: "no-cache",
  });

  const dispatch = useDispatch();
  // const { data } = useQuery(GET_TRAIL, {
  //   variables: { trailSlug: params.trailSlug },
  //   fetchPolicy: "no-cache",
  // });
  // const session = await getServerAuth(); // Obtém a sessão no servidor
  // const userId = session?.user?.id || "";

  // const { data } = await client.query({
  //   query: GET_TRAIL,
  //   variables: { trailSlug: params.trailSlug, userId },
  //   fetchPolicy: "no-cache",
  // });

  const selectedTrail = data ? (data.trail.data as Trail) : null;

  useEffect(() => {
    dispatch(clearLesson());
  }, []);

  if (!selectedTrail) {
    return <div>Trail not found</div>;
  }

  return (
    <section className="relative">
      <Link
        href="/learn"
        className="absolute -top-10 left-0 duration-200 hover:text-blue"
      >
        <span className="text-xs">Voltar à listagem de trilhas</span>
      </Link>

      <h1 className="text-4xl font-bold">
        Trilhas: <span>{selectedTrail.name}</span>
      </h1>
      <p className="mt-2 text-sm">{selectedTrail.description}</p>

      <div className="mt-8 flex flex-wrap items-center justify-start gap-2">
        {selectedTrail.tags.split(",").map((tag: string, index: number) => {
          return (
            <div
              key={index}
              className="select-none rounded-2xl border-2 border-border px-3 py-1 text-center text-xs"
            >
              {tag}
            </div>
          );
        })}
      </div>

      <TrailContent modules={selectedTrail.modules} />
    </section>
  );
}

"use client";

import { GET_LEADERBOARD } from "@/graphql/queries/leaderboard.queries";
import { useQuery } from "@apollo/client";
import { Medal } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

type UserInfo = {
  id: string;
  xpEarned: number;
  weekStart: string;
  user: {
    name: string;
    image: string;
    username: string;
  };
};

export function LeaderboardList() {
  const { data, loading, error } = useQuery(GET_LEADERBOARD);

  if (loading) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <p className="w-full rounded-lg border-2 border-border p-6 text-center font-bold shadow-md">
          Carregando informações
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <p className="w-full rounded-lg border-2 border-border p-6 text-center font-bold shadow-md">
          Erro ao carregar informações
        </p>
      </div>
    );
  }

  if (data && data.leaderboard.data.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <p className="w-full rounded-lg border-2 border-border p-6 text-center font-bold shadow-md">
          Ainda não há usuários no ranking desta semana!
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col gap-4">
      {data.leaderboard.data.map((user: UserInfo, index: number) => {
        let positionIcon = null;
        if (index === 0) {
          positionIcon = (
            <Medal size={32} weight="fill" className="text-yellow-500" />
          );
        } else if (index === 1) {
          positionIcon = (
            <Medal size={32} weight="fill" className="text-gray-400" />
          );
        } else if (index === 2) {
          positionIcon = (
            <Medal size={32} weight="fill" className="text-[#E5AE7C]" />
          );
        }

        return (
          <Link
            href={`/profile/${user.user.username}`}
            key={index}
            className="flex items-center justify-start rounded-2xl px-4 py-2 duration-200 hover:bg-selected"
          >
            <div className="mr-4 flex w-10 items-center justify-center text-xl font-bold">
              {positionIcon || index + 1}
            </div>
            <div className="flex flex-1 items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative min-h-12 min-w-12 overflow-hidden rounded-full bg-slate-400">
                  <Image
                    alt="User image"
                    src={user.user.image}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="font-bold">{user.user.name}</span>
              </div>
              <span>{user.xpEarned} XP</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

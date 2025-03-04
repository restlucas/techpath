"use client";

import { FlagBanner, Medal, Trophy } from "@phosphor-icons/react";
import Image from "next/image";

type UserInfo = {
  id: string;
  xpEarned: number;
  weekStart: string;
  user: {
    name: string;
    image: string;
  };
};

type LeaderboardListProps = {
  data: UserInfo[];
};

export function LeaderboardList({ data }: LeaderboardListProps) {
  return (
    <div className="mt-12 flex flex-col gap-4">
      {data.map((user: UserInfo, index: number) => {
        let positionIcon = null;
        if (index === 0) {
          positionIcon = (
            <Trophy size={28} weight="fill" className="text-yellow-500" />
          );
        } else if (index === 1) {
          positionIcon = (
            <Medal size={28} weight="fill" className="text-gray-400" />
          );
        } else if (index === 2) {
          positionIcon = (
            <FlagBanner size={28} weight="fill" className="text-[#cd7f32]" />
          );
        }

        return (
          <div
            key={index}
            className="flex items-center justify-start rounded-lg border-2 border-border p-6"
          >
            <div className="mr-6 text-xl font-bold">
              {positionIcon || index + 1}
            </div>
            <div className="flex flex-1 items-center justify-between">
              <div className="flex items-center gap-4">
                <Image
                  alt="User image"
                  src={user.user.image}
                  width={50}
                  height={50}
                  className="rounded-md"
                />
                <span className="font-bold">{user.user.name}</span>
              </div>
              <span>{user.xpEarned}xp</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

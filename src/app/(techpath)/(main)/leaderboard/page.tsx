import { NextMondayCountdown } from "@/components/Countdown";
import { LeaderboardList } from "./list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "leaderboard | techpath",
};

export default async function LeaderboardPage() {
  return (
    <section className="m-auto h-auto w-[600px]">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-4xl font-bold">Leaderboards</h1>
        <p className="text-right text-sm font-bold text-blue"></p>
      </div>
      <p className="mt-2 text-sm">Ranking de usuários semanal</p>

      <p className="my-8 text-center font-bold text-blue">
        acaba em <NextMondayCountdown />
      </p>

      <div className="h-[2px] w-full rounded-md bg-border" />

      <LeaderboardList />
    </section>
  );
}

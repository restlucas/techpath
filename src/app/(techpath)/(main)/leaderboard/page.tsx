import { LeaderboardList } from "./list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "leaderboard | techpath",
};

export default async function LeaderboardPage() {
  return (
    <section className="m-auto h-auto w-[600px]">
      <h1 className="text-4xl font-bold">Leaderboards</h1>
      <p className="mt-2 text-sm">Ranking de usuários semanal</p>

      <LeaderboardList />
    </section>
  );
}

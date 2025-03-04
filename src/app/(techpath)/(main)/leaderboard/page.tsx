import { GET_LEADERBOARD } from "@/graphql/queries/leaderboard.queries";
import client from "@/lib/apolloClient";
import { LeaderboardList } from "./list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leaderboard | techpath",
};

export default async function LeaderboardPage() {
  const {
    data: { leaderboard },
  } = await client.query({
    query: GET_LEADERBOARD,
  });

  const leaderboardRanking = leaderboard.data;

  if (!leaderboardRanking) {
    return <p>No leaderboard found</p>;
  }

  return (
    <section className="m-auto h-auto w-[600px]">
      <h1 className="text-4xl font-bold">Leaderboards</h1>
      <p className="mt-2 text-sm">Ranking de usuários semanal</p>

      <LeaderboardList data={leaderboardRanking} />
    </section>
  );
}

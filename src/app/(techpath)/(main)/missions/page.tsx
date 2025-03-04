import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { GET_MISSIONS } from "@/graphql/queries/mission.queries";
import { createApolloClient } from "@/lib/apolloClient";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

type MissionProps = {
  completed: boolean;
  progress: number;
  mission: {
    id: string;
    title: string;
    description: string;
    frequency: "DAILY" | "WEEKLY";
    goalType: string;
    goalValue: number;
    rewardXp: string;
  };
};

export const metadata: Metadata = {
  title: "missions | techpath",
};

export default async function MissionsPage() {
  const session = await getServerSession(authOptions);
  const client = createApolloClient(session);

  const {
    data: { missions },
  } = await client.query({
    query: GET_MISSIONS,
  });

  const dailyMissions = missions.data.filter(
    (mission: MissionProps) => mission.mission.frequency === "DAILY",
  );
  const weeklyMissions = missions.data.filter(
    (mission: MissionProps) => mission.mission.frequency === "WEEKLY",
  );

  return (
    <section className="m-auto h-auto w-auto">
      <div className="grid grid-cols-1 items-start gap-12 min-[1000px]:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold min-[1100px]:text-4xl">
            Missões do dia
          </h2>
          <div className="mt-6 divide-y-2 divide-border rounded-lg border-2 border-border shadow-md">
            {dailyMissions.map((mission: MissionProps, index: number) => {
              return (
                <div key={index} className="relative gap-2 p-6">
                  {mission.completed && (
                    <span className="absolute right-5 top-5 rounded-md bg-green-600 px-2 py-1 text-xs font-bold text-white">
                      Completado
                    </span>
                  )}
                  <p className="text-xs">{mission.mission.rewardXp}xp</p>
                  <div className="mt-1">
                    <p className="text-lg font-semibold text-blue">
                      {mission.mission.title}
                    </p>
                    <span
                      className={`text-wrap text-sm ${mission.completed ? "line-through" : ""}`}
                    >
                      {mission.mission.description}
                    </span>
                  </div>
                  <p
                    className={`mt-4 w-full rounded-md py-1 text-center text-xs ${mission.progress === mission.mission.goalValue ? "bg-green-600" : "bg-border/50"}`}
                  >
                    {mission.progress}/{mission.mission.goalValue}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold min-[1100px]:text-4xl">
            Missões da semana
          </h2>
          <div className="mt-6 divide-y-2 divide-border rounded-lg border-2 border-border shadow-md">
            {weeklyMissions.map((mission: MissionProps, index: number) => {
              return (
                <div key={index} className="relative gap-2 p-6">
                  {mission.completed && (
                    <span className="absolute right-5 top-5 rounded-md bg-green-600 px-2 py-1 text-xs font-bold text-white">
                      Completado
                    </span>
                  )}
                  <p className="text-xs">{mission.mission.rewardXp}xp</p>
                  <div className="mt-1">
                    <p className="text-lg font-semibold text-blue">
                      {mission.mission.title}
                    </p>
                    <span
                      className={`text-wrap text-sm ${mission.completed ? "line-through" : ""}`}
                    >
                      {mission.mission.description}
                    </span>
                  </div>
                  <p
                    className={`mt-4 w-full rounded-md py-1 text-center text-xs ${mission.progress === mission.mission.goalValue ? "bg-green-600" : "bg-border/50"}`}
                  >
                    {mission.progress}/{mission.mission.goalValue}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

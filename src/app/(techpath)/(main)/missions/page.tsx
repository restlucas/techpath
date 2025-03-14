import { MidnightCountdown, NextMondayCountdown } from "@/components/Countdown";
import { GET_MISSIONS } from "@/graphql/queries/mission.queries";
import { createApolloClient } from "@/lib/apolloClient";
import { authOptions } from "@/utils/authOptions";
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
  title: "missões | techpath",
};

export default async function MissionsPage() {
  const session = await getServerSession(authOptions);
  const client = createApolloClient(session);

  const {
    data: { missions },
    loading,
  } = await client.query({
    query: GET_MISSIONS,
  });

  const dailyMissions = missions.data.filter(
    (mission: MissionProps) => mission.mission.frequency === "DAILY",
  );
  const weeklyMissions = missions.data.filter(
    (mission: MissionProps) => mission.mission.frequency === "WEEKLY",
  );

  if (loading) {
    return (
      <section className="m-auto h-auto w-auto">
        <div className="grid grid-cols-1 items-start gap-12 min-[1000px]:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold min-[1100px]:text-4xl">
              Missões do dia
            </h2>
            <span className="text-xs">
              expira em <MidnightCountdown />
            </span>
            <div className="mt-6 divide-y-2 divide-border overflow-hidden rounded-lg border-2 border-border shadow-md">
              {Array.from({ length: 3 }).map((_, index) => {
                return (
                  <div key={index} className="relative p-6">
                    <div className="h-4 w-[50px] animate-pulse rounded-lg bg-selected" />
                    <div className="mt-1">
                      <div className="h-7 w-[150px] animate-pulse rounded-lg bg-selected" />
                      <div className="mt-2 h-4 w-full animate-pulse rounded-lg bg-selected" />
                    </div>
                    <div className="mt-4 h-6 w-full animate-pulse rounded-lg bg-selected" />
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold min-[1100px]:text-4xl">
              Missões da semana
            </h2>
            <span className="text-xs">
              expira em <NextMondayCountdown />
            </span>
            <div className="mt-6 divide-y-2 divide-border overflow-hidden rounded-lg border-2 border-border shadow-md">
              {Array.from({ length: 3 }).map((_, index) => {
                return (
                  <div key={index} className="relative p-6">
                    <div className="h-4 w-[50px] animate-pulse rounded-lg bg-selected" />
                    <div className="mt-1">
                      <div className="h-7 w-[150px] animate-pulse rounded-lg bg-selected" />
                      <div className="mt-2 h-4 w-full animate-pulse rounded-lg bg-selected" />
                    </div>
                    <div className="mt-4 h-6 w-full animate-pulse rounded-lg bg-selected" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="m-auto h-auto w-auto">
      <div className="grid grid-cols-1 items-start gap-12 min-[1000px]:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold min-[1100px]:text-4xl">
            Missões do dia
          </h2>
          <span className="text-xs">
            expira em <MidnightCountdown />
          </span>
          <div className="mt-6 divide-y-2 divide-border rounded-lg border-2 border-border shadow-md">
            {dailyMissions.length > 0 ? (
              dailyMissions.map((mission: MissionProps, index: number) => {
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
              })
            ) : (
              <div className="w-full text-wrap p-6 text-center">
                Sem missões diárias até o momento
              </div>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold min-[1100px]:text-4xl">
            Missões da semana
          </h2>
          <span className="text-xs">
            expira em <NextMondayCountdown />
          </span>
          <div className="mt-6 divide-y-2 divide-border rounded-lg border-2 border-border shadow-md">
            {weeklyMissions.length > 0 ? (
              weeklyMissions.map((mission: MissionProps, index: number) => {
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
              })
            ) : (
              <div className="w-full text-wrap p-6 text-center">
                Sem missões semanais até o momento
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

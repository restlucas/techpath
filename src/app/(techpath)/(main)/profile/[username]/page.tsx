"use client";

import { FollowButton } from "@/components/FollowButton";
import { GET_FOLLOWING, GET_PROFILE } from "@/graphql/queries/user.queries";
import { formatSinceDate } from "@/utils/date";
import { useQuery } from "@apollo/client";
import { Fire, Lightning } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Trail = {
  id: string;
  name: string;
  slug: string;
  completed: boolean;
};

type Following = {
  _count: {
    followers: number;
    following: number;
  };
};

type Profile = {
  id: string;
  username: string;
  name: string;
  image: string;
  streak: number;
  totalXp: number;
  createdAt: string;
  trails: Trail[];
};

export default function ProfilePage() {
  const { username } = useParams();
  const { data: session } = useSession();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [following, setFollowing] = useState<Following | null>(null);

  const { data, loading } = useQuery(GET_PROFILE, {
    variables: { username: username },
  });

  const { data: followingData, refetch } = useQuery(GET_FOLLOWING, {
    variables: { username: username },
  });

  useEffect(() => {
    if (data) {
      setProfile(data.profile.data);
    }
  }, [data]);

  useEffect(() => {
    if (followingData) {
      setFollowing(followingData.following.data[0]);
    }
  }, [followingData]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!profile) {
    return <div>Perfil não encontrado...</div>;
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="relative min-h-[120px] min-w-[120px] overflow-hidden rounded-full bg-blue p-1">
          <Image
            src={profile.image}
            alt={profile.name}
            fill
            className="rounded-full object-cover p-1"
          />
        </div>
      </div>
      <div className="mb-8 flex w-full gap-4">
        <div className="flex flex-1 flex-col items-start justify-start">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-4xl font-bold text-blue">{profile.name}</h1>
            {profile.username !== session?.user.username && (
              <FollowButton refetch={refetch} userId={profile.id as string} />
            )}
          </div>
          <p className="text-sm font-semibold">{profile.username}</p>
          <span className="mt-4 text-xs">
            {formatSinceDate(profile.createdAt)}
          </span>

          <div className="mt-2 flex items-start justify-start gap-2">
            <span className="w-auto cursor-pointer rounded-lg border-2 border-border px-2 py-1 text-center text-xs font-semibold duration-200 hover:bg-selected hover:text-blue">
              seguidores {following ? following._count.followers : 0}
            </span>
            <span className="w-auto cursor-pointer rounded-lg border-2 border-border px-2 py-1 text-center text-xs font-semibold duration-200 hover:bg-selected hover:text-blue">
              seguindo {following ? following._count.following : 0}
            </span>
          </div>
        </div>
      </div>

      <div className="h-[2px] w-full rounded-md bg-border" />

      <div className="mt-8">
        <h2 className="text-2xl font-bold">Estatísticas</h2>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex cursor-default items-center justify-between rounded-lg border-2 border-border px-6 py-3 shadow-md">
            <div className="flex-1">
              <p className="text-xl font-semibold">{profile.streak}</p>
              <p className="font-semibold">Dias seguidos</p>
            </div>
            <Fire size={32} weight="fill" className="fill-orange" />
          </div>
          <div className="flex cursor-default items-center justify-between rounded-lg border-2 border-border px-6 py-3 shadow-md">
            <div className="flex-1">
              <p className="text-xl font-semibold">{profile.totalXp}</p>
              <p className="font-semibold">Total de XP</p>
            </div>
            <Lightning size={32} weight="fill" className="fill-yellow-500" />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold">Trilhas</h2>

        <div className="mt-4 grid grid-cols-4 gap-4">
          {profile.trails.map((trail: Trail, index: number) => {
            return (
              <div
                key={index}
                className={`relative h-[200px] select-none rounded-lg border-2 p-2 ${trail.completed ? "border-green-500 bg-green-500/20" : "border-dashed border-border"}`}
              >
                <div
                  className={`flex h-full w-full flex-col items-center justify-center gap-6`}
                >
                  <Image
                    src={`/assets/${trail.slug}.svg`}
                    width={50}
                    height={70}
                    alt="Trail icon"
                    className={`${trail.completed && "grayscale"}`}
                  />
                  <p className="text-center text-sm font-bold">{trail.name}</p>

                  {!trail.completed ? (
                    <p className="text-xs font-bold text-blue">Em andamento</p>
                  ) : (
                    <p className="text-xs font-bold text-green-500">
                      Concluído
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

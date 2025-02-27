"use client";

import { trails } from "@/constants/data";
import { formatSinceDate } from "@/utils/date";
import { Fire, Lightning } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function ProfilePage() {
  const { data } = useSession();
  const user = data?.user;

  return (
    <section className="m-auto w-[900px]">
      <div className="mb-8 flex w-full gap-4">
        <Image
          src={user.image}
          alt={user.name}
          width={100}
          height={100}
          className="rounded-lg"
        />

        <div className="flex flex-1 flex-col items-start justify-start">
          <h1 className="text-4xl font-bold text-blue">{user.name}</h1>
          <p className="text-sm font-semibold">{user.username}</p>
          <span className="mt-auto text-xs">
            {formatSinceDate(user.createdAt)}
          </span>
        </div>

        {/* <div className="flex flex-col items-end justify-start gap-2">
          <span className="w-[150px] cursor-pointer rounded-lg py-2 text-center font-semibold duration-200 hover:bg-selected hover:text-blue">
            seguidores 20
          </span>
          <span className="w-[150px] cursor-pointer rounded-lg py-2 text-center font-semibold duration-200 hover:bg-selected hover:text-blue">
            seguindo 20
          </span>
        </div> */}
      </div>

      <div className="h-[2px] w-full rounded-md bg-border" />

      <div className="mt-8">
        <h2 className="text-2xl font-bold">Estatísticas</h2>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex cursor-default items-center justify-between rounded-lg border-2 border-border px-6 py-3 shadow-md">
            <div className="flex-1">
              <p className="text-xl font-semibold">{user.streak}</p>
              <p className="font-semibold">Dias seguidos</p>
            </div>
            <Fire size={32} weight="fill" className="fill-orange" />
          </div>
          <div className="flex cursor-default items-center justify-between rounded-lg border-2 border-border px-6 py-3 shadow-md">
            <div className="flex-1">
              <p className="text-xl font-semibold">{user.totalXp}</p>
              <p className="font-semibold">Total de XP</p>
            </div>
            <Lightning size={32} weight="fill" className="fill-yellow-500" />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold">Trilhas</h2>

        <div className="mt-4 grid grid-cols-6 gap-4">
          {trails.map((trail, index) => {
            return (
              <div
                key={index}
                className={`relative h-[200px] select-none rounded-lg border-2 p-2 ${index === 0 ? "border-green-500 bg-green-500/20" : "border-dashed border-border"}`}
              >
                <div
                  className={`flex h-full w-full flex-col items-center justify-center gap-6 ${index === 0 ? "" : "opacity-20"}`}
                >
                  <Image
                    src={trail.icon}
                    width={50}
                    height={70}
                    alt="Trail icon"
                    className={`${index !== 0 && "grayscale"}`}
                  />
                  <p className="text-center text-sm font-bold">{trail.label}</p>

                  {index !== 0 ? (
                    <p className="text-xs font-bold">Não iniciado</p>
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
    </section>
  );
}

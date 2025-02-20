'use client'

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface ProtectedPageProps {
  children: ReactNode;
}

export function ProtectedPage({ children }: ProtectedPageProps){
  const { data: session, status } = useSession();
  const router = useRouter();


  useEffect(() => {
    if (status !== "loading" && !session) {
      router.push("/login");
    }
  }, [session, status, router]);

  if (status === "loading" || !session) {
    return (
        <div className="bg-[#09090B] w-full h-screen flex items-center justify-center">
            <div className="flex w-full items-center justify-center">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            </div>
        </div>
    ); 
  }


  return <>{children}</>; 
};


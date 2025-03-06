"use client";

import { fetchSession } from "@/redux/slices/authSlice";
import { setFollowing } from "@/redux/slices/followSlice";
import { AppDispatch } from "@/redux/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";

interface ProtectedPageProps {
  children: ReactNode;
}

export function ProtectedPage({ children }: ProtectedPageProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchSession());
  }, [dispatch]);

  useEffect(() => {
    if (session) {
      dispatch(setFollowing(session.user.following));
    }
  }, [session]);

  useEffect(() => {
    if (status !== "loading" && !session) {
      router.push("/login");
    }
  }, [session, status, router]);

  if (status === "loading" || !session) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-dark">
        <div className="flex w-full items-center justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-transparent" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

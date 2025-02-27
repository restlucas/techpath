"use client";

import { ProtectedPage } from "@/components/ProtectedPage";

import { store } from "@/redux/store";
import { Provider } from "react-redux";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedPage>
      <Provider store={store}>{children}</Provider>
    </ProtectedPage>
  );
}

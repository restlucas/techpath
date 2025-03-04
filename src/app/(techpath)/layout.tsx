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
    <Provider store={store}>
      <ProtectedPage>{children}</ProtectedPage>
    </Provider>
  );
}

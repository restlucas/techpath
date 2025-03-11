import { Metadata } from "next";

export const metadata: Metadata = {
  title: "perfil | techpath",
};

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className="m-auto w-[700px]">{children}</section>;
}

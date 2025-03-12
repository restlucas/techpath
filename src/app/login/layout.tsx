import { Metadata } from "next";

export const metadata: Metadata = {
  title: "login | techpath",
  description: "learning is funny",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

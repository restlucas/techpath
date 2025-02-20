// import { ProtectedPage } from "@/components/ProtectedPage";
import { Navigation } from "@/components/Navigation";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div
        className={`flex h-screen w-full flex-col divide-x-2 divide-border antialiased min-[900px]:flex-row`}
      >
        <Navigation />
        <main className="flex-grow overflow-x-hidden p-6">{children}</main>
      </div>
    </>
  );
}

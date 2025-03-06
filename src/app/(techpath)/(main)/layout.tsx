import { Navigation } from "@/components/Navigation";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`flex h-screen w-full divide-x-2 divide-border antialiased`}
    >
      <Navigation />
      <main className="flex-grow overflow-x-hidden px-12 py-10">
        {/* Container */}
        <div className="m-auto flex max-w-[1100px] flex-col gap-4">
          {children}
        </div>
      </main>
    </div>
  );
}

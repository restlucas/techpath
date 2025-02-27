"use client";

export default function LessonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex h-screen w-full items-start justify-center">
      {children}
    </section>
  );
}

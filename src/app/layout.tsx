import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/components/AppProviders";
import { Quicksand } from "next/font/google";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "techpath | home",
  description: "learning is funny",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <AppProviders>
          <body className={`${quicksand.className} bg-dark text-foreground`}>
            {children}
          </body>
        </AppProviders>
      </NextIntlClientProvider>
    </html>
  );
}

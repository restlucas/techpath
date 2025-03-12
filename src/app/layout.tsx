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
        <body className={`${quicksand.className} bg-dark text-foreground`}>
          <AppProviders>{children}</AppProviders>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}

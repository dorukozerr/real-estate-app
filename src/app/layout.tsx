import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeToggler } from "@/components/theme/theme-toggler";
import { BackgroundGradient } from "@/components/layout/background-gradient";
import { Toaster } from "@/components/ui/sonner";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./globals.css";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// TODO - Update metadata
export const metadata: Metadata = {
  title: "Emluck",
  description: "Basit bir emlakçı sitesi",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning={true} className="h-full">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} h-full w-full antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex h-full w-full flex-col overflow-hidden">
            <header className="relative z-10 mx-auto flex h-[70px] min-h-[70px] w-screen max-w-[1440px] items-center justify-between border-b border-border px-4">
              <Link href="/">
                <h2 className="text-base font-bold sm:text-2xl">Emluck</h2>
              </Link>
              <ThemeToggler />
            </header>
            <main className="relative z-10 flex w-full flex-1 flex-col overflow-hidden">
              {children}
            </main>
            <div className="absolute left-0 top-0 -z-10 h-full w-full animate-[spin_50000ms_linear_infinite]">
              <BackgroundGradient />
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;

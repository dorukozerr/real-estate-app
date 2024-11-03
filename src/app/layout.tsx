import type { Metadata } from "next";
import { Fira_Sans_Condensed } from "next/font/google";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeToggler } from "@/components/theme/theme-toggler";
import { Toaster } from "@/components/ui/sonner";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./globals.css";

const firaSans = Fira_Sans_Condensed({
  variable: "--font-fira",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin-ext"],
});

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
        className={`${firaSans.variable} h-full`}
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
                <h2 className="text-2xl font-bold sm:text-4xl">Emluck</h2>
              </Link>
              <ThemeToggler />
            </header>
            <main className="relative z-10 flex w-full flex-1 flex-col overflow-hidden">
              {children}
            </main>
            <div className="absolute left-0 top-0 -z-10 h-[300vw] w-[300vw] animate-[spin_20000ms_linear_infinite] sm:h-full sm:w-full">
              <div className="absolute left-1/2 top-1/2 h-[40vh] w-[100vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 bg-gradient-to-r from-[#3B4E68] to-[#5F5255] blur-3xl"></div>
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;

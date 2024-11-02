import type { Metadata } from "next";
import { Fira_Sans_Condensed } from "next/font/google";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeToggler } from "@/components/theme/theme-toggler";
import { BackgroundGradient } from "@/components/layout/background-gradient";
import { Toaster } from "@/components/ui/sonner";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./globals.css";

const firaSans = Fira_Sans_Condensed({
  variable: "--font-fira",
  weight: ["100", "200", "300", "400"],
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
      <body suppressHydrationWarning={true} className={firaSans.variable}>
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

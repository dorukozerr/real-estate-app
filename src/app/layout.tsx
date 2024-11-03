import type { Metadata } from "next";
import { Fira_Sans_Condensed } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/layout/header";

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
}>) => (
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
          <Header />
          <main className="relative z-10 flex w-full flex-1 flex-col overflow-hidden">
            {children}
          </main>
          <div className="absolute -z-10 h-full w-full animate-[spin_20000ms_linear_infinite]">
            <div className="absolute left-1/2 top-1/2 h-[100vw] w-[100vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-pink-200 to-green-200 blur-3xl dark:from-[#3B4E68] dark:to-[#5F5255] sm:h-[40vh] sm:w-[100vw]"></div>
          </div>
        </div>
        <Toaster />
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;

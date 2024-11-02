import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeToggler } from "@/components/theme/theme-toggler";
import "./globals.css";
import "swiper/css";
import "swiper/css/effect-cards";

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
  title: "Real Estate App",
  description: "Basic real estate app made with love and nextjs",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning={true} className="h-full">
      <body
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
                <h2 className="text-base font-bold sm:text-2xl">Real Estate</h2>
              </Link>
              <ThemeToggler />
            </header>
            <main className="relative z-10 flex w-full flex-1 flex-col overflow-hidden">
              {children}
            </main>
            <div className="absolute left-0 top-0 -z-10 h-full w-full animate-[spin_8200ms_linear_infinite]">
              <div className="absolute left-[50%] top-[70%] h-[35vw] w-[35vw] -translate-x-[50%] -translate-y-[50%] rounded-full bg-gradient-1 blur-3xl"></div>
              <div className="absolute left-[80%] top-[50%] h-[45vw] w-[45vh] -translate-x-[50%] -translate-y-[50%] rounded-full bg-gradient-2 blur-3xl"></div>
              <div className="absolute left-[20%] top-[50%] h-[60vh] w-[60vh] -translate-x-[50%] -translate-y-[50%] rounded-full bg-gradient-3 blur-3xl"></div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;

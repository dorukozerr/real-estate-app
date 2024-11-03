"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ThemeToggler } from "@/components/theme/theme-toggler";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const pathname = usePathname();

  console.log("pathname =>", pathname);

  const links = [
    { href: "/about-us", label: "Biz Kimiz" },
    { href: "/for-sale", label: "Satılık İlanlar" },
    { href: "/for-rent", label: "Kiralık İlanlar" },
  ];

  return (
    <header className="relative z-10 mx-auto flex h-[70px] min-h-[70px] w-screen max-w-[1440px] items-center justify-between border-b border-border px-4">
      <Link href="/">
        <h2 className="text-2xl font-bold sm:text-4xl">Emluck</h2>
      </Link>
      <div className="flex items-center justify-start gap-4">
        {links.map(({ href, label }, linkIndex) => (
          <Link href={href} key={`headerLink-${linkIndex}`}>
            <Button variant={pathname === href ? "outline" : "ghost"}>
              {label}
            </Button>
          </Link>
        ))}
        <ThemeToggler />
      </div>
    </header>
  );
};

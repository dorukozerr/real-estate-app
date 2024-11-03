"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { ThemeToggler } from "@/components/theme/theme-toggler";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const pathname = usePathname();
  const { setTheme } = useTheme();

  const themeOptions = [
    { label: "Aydınlık", onClick: () => setTheme("light") },
    { label: "Karanlık", onClick: () => setTheme("dark") },
    { label: "Sistem", onClick: () => setTheme("system") },
  ];

  const links = [
    { href: "/", label: "Anasayfa" },
    { href: "/about-us", label: "Biz Kimiz" },
    { href: "/for-sale", label: "Satılık İlanlar" },
    { href: "/for-rent", label: "Kiralık İlanlar" },
  ];

  return (
    <header className="relative z-10 mx-auto flex h-[70px] min-h-[70px] w-screen max-w-[1440px] items-center justify-between border-b border-border px-4">
      <Link href="/">
        <h2 className="text-2xl font-bold sm:text-4xl">Emluck</h2>
      </Link>
      <div className="hidden items-center justify-start gap-4 sm:flex">
        {links.map(({ href, label }, linkIndex) => (
          <Link href={href} key={`headerLink-${linkIndex}`}>
            <Button variant={pathname === href ? "outline" : "ghost"}>
              {label}
            </Button>
          </Link>
        ))}
        <ThemeToggler />
      </div>
      <div className="block sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <HamburgerMenuIcon className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Menü</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {links.map(({ href, label }, linkIndex) => (
                <Link href={href} key={`mobileMenuItem-${linkIndex}`}>
                  <DropdownMenuItem>
                    <span className={href === pathname ? "underline" : ""}>
                      {label}
                    </span>
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <span>Tema</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {themeOptions.map(
                      ({ label, onClick }, themeOptionIndex) => (
                        <DropdownMenuItem
                          onClick={onClick}
                          key={`mobileThemeToggler-${themeOptionIndex}`}
                        >
                          <span>{label}</span>
                        </DropdownMenuItem>
                      )
                    )}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

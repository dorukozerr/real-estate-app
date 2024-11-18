"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const { setTheme } = useTheme();

  const mode = searchParams.get("mode") || "";

  const themeOptions = [
    { label: "Aydınlık", onClick: () => setTheme("light") },
    { label: "Karanlık", onClick: () => setTheme("dark") },
    { label: "Sistem", onClick: () => setTheme("system") },
  ];

  const links = [
    { href: "/", label: "Anasayfa" },
    { href: "/about-us", label: "Biz Kimiz" },
    {
      href: "/listing?mode=sale&page=1&size=9",
      label: "Satılık İlanlar",
      key: "sale",
    },
    {
      href: "/listing?mode=rent&page=1&size=9",
      label: "Kiralık İlanlar",
      key: "rent",
    },
  ];

  return (
    <header className="relative z-10 mx-auto flex h-[70px] min-h-[70px] w-full max-w-[1440px] items-center justify-between border-b border-border px-4">
      <Link href="/">
        <h2 className="text-2xl font-bold sm:text-4xl">Emluck</h2>
      </Link>
      <div className="hidden items-center justify-start gap-4 sm:flex">
        {links
          .filter(({ label }) => label !== "Anasayfa")
          .map(({ href, label, key }, linkIndex) => (
            <Link href={href} key={`headerLink-${linkIndex}`}>
              <Button variant={key === mode ? "outline" : "ghost"}>
                {label}
              </Button>
            </Link>
          ))}
        <ThemeToggler />
      </div>
      <div className="block sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <HamburgerMenuIcon className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Menü</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {links.map(({ href, label, key }, linkIndex) => (
                <Link href={href} key={`mobileMenuItem-${linkIndex}`}>
                  <DropdownMenuItem>
                    <span className={key === mode ? "underline" : ""}>
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

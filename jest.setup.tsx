import React from "react";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => "",
  useSearchParams: () => new URLSearchParams(),
}));

// Link mock
jest.mock(
  "next/link",
  () =>
    ({ children, href }: { children: React.ReactNode; href: string }) => (
      <a href={href}>{children}</a>
    )
);

jest.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: jest.fn(),
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

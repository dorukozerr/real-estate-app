import type { Config } from "jest";
import nextJest from "next/jest";
import path from "path";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  testEnvironment: "jest-environment-jsdom",
  clearMocks: true,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.tsx"],
  testMatch: ["<rootDir>/src/__tests__/**/*.(test|spec).(ts|tsx)"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  modulePaths: [path.join(__dirname, "src")],
  moduleDirectories: ["node_modules", "src"],
  rootDir: ".",
};

export default createJestConfig(config);

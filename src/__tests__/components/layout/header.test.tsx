import { ThemeProvider } from "next-themes";
import { render } from "@testing-library/react";
import { Header } from "@/components/layout/header";

describe("Header", () => {
  const originalInnerWidth = window.innerWidth;

  const setViewportWidth = (width: number) => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: width,
    });

    window.getComputedStyle = (element: Element) => {
      const isMobile = width < 640;
      const isMobileNav = element.getAttribute("data-testid") === "mobile-nav";
      const isDesktopNav =
        element.getAttribute("data-testid") === "desktop-nav";

      return {
        display: (() => {
          if (isMobile) {
            return isMobileNav ? "block" : "none";
          } else {
            return isDesktopNav ? "flex" : "none";
          }
        })(),
        visibility: "visible",
      } as CSSStyleDeclaration;
    };

    window.dispatchEvent(new Event("resize"));
  };

  const renderHeader = () =>
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  it("renders correctly", () => {
    const { container } = renderHeader();

    expect(container).toMatchSnapshot();
  });

  it("desktop navbar is hidden if screen is sm and mobile navbar is visible", () => {
    setViewportWidth(500);

    const { getByTestId } = renderHeader();

    const mobileNav = getByTestId("mobile-nav");
    const desktopNav = getByTestId("desktop-nav");

    expect(window.getComputedStyle(mobileNav).display).toBe("block");
    expect(window.getComputedStyle(desktopNav).display).toBe("none");
  });

  it("mobile navbar is hidden if screen is bigger than sm and desktop navbar is visible", () => {
    setViewportWidth(1000);

    const { getByTestId } = renderHeader();

    const mobileNav = getByTestId("mobile-nav");
    const desktopNav = getByTestId("desktop-nav");

    expect(window.getComputedStyle(mobileNav).display).toBe("none");
    expect(window.getComputedStyle(desktopNav).display).toBe("flex");
  });
});

import { BrandIcon } from "@/components/about-us/brand-icon";

const Page = () => (
  <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-center p-4">
    <div className="flex h-full w-full flex-1 items-center justify-center">
      <BrandIcon />
    </div>
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-4 p-4 text-center">
      <h2 className="text-5xl font-bold">Biz Kimiz?</h2>
      <p className="text-lg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <p className="text-lg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </div>
  </div>
);

export default Page;

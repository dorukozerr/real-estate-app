import Link from "next/link";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export const Pagination = ({
  searchParams,
  page,
  totalPages,
  hasMore,
}: {
  searchParams: { [key: string]: string | string[] | undefined } | undefined;
  page: number;
  totalPages: number;
  hasMore: boolean;
}) => {
  const createQueryString = (newPage: number) => {
    const params = new URLSearchParams();

    Object.entries(searchParams || {}).forEach(([key, value]) => {
      if (value && key !== "page") {
        params.set(key, Array.isArray(value) ? value[0] || "" : value);
      }
    });

    params.set("page", newPage.toString());

    return params.toString();
  };

  return (
    <div className="flex h-max w-full items-center justify-end gap-4">
      <Button
        disabled={page < 2}
        className="m-0 p-0"
        size="icon"
        variant="outline"
      >
        <Link
          className="flex h-full w-full items-center justify-center"
          href={`?${createQueryString(1)}`}
        >
          <DoubleArrowLeftIcon className="h-[1.2rem] w-[1.2rem]" />
        </Link>
      </Button>
      <Button
        variant="outline"
        disabled={page < 2}
        className="m-0 p-0"
        size="icon"
      >
        <Link
          className="flex h-full w-full items-center justify-center"
          href={`?${createQueryString(page - 1)}`}
        >
          <ChevronLeftIcon className="h-[1.2rem] w-[1.2rem]" />
        </Link>
      </Button>
      <span>
        {page} / {totalPages}
      </span>
      <Button
        variant="outline"
        disabled={!hasMore}
        className="m-0 p-0"
        size="icon"
      >
        <Link
          className="flex h-full w-full items-center justify-center"
          href={`?${createQueryString(page + 1)}`}
        >
          <ChevronRightIcon className="h-[1.2rem] w-[1.2rem]" />
        </Link>
      </Button>
      <Button
        variant="outline"
        disabled={!hasMore}
        className="m-0 p-0"
        size="icon"
      >
        <Link
          className="flex h-full w-full items-center justify-center"
          href={`?${createQueryString(totalPages)}`}
        >
          <DoubleArrowRightIcon className="h-[1.2rem] w-[1.2rem]" />
        </Link>
      </Button>
    </div>
  );
};

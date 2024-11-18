import { notFound } from "next/navigation";
import { getProperties } from "@/actions";
import { PaginatedProperties, PageProps } from "@/types";
import { PropertyCard } from "@/components/listing/property-card";
import { Pagination } from "@/components/listing/pagination";

const Page = async ({ searchParams }: PageProps) => {
  const mode = searchParams?.mode;
  const page = Number(searchParams?.page) || 1;
  const size = Number(searchParams?.size) || 9;

  if (mode !== "rent" && mode !== "sale") {
    notFound();
  }

  const properties = await getProperties({ mode, page, size });
  const p = JSON.parse(JSON.stringify(properties)) as PaginatedProperties;

  const { listings, totalPages, hasMore, total } = p;

  return (
    <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-center">
      {listings.length ? (
        <div className="flex h-full w-full flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold sm:text-3xl">
              {mode === "rent" ? "Kiralık" : mode === "sale" ? "Satılık" : ""}{" "}
              İlanlar - {total}
            </h2>
          </div>
          <div className="grid h-full w-full flex-1 grid-cols-1 gap-4 overflow-auto border-b border-t border-border py-4 backdrop-blur-3xl md:grid-cols-2 xl:grid-cols-3">
            {listings.map((property) => (
              <PropertyCard
                property={property}
                key={`property-${property._id}`}
              />
            ))}
          </div>
          <Pagination
            searchParams={searchParams}
            page={page}
            totalPages={totalPages}
            hasMore={hasMore}
          />
        </div>
      ) : (
        <span className="text-xl font-bold">Kiralık ilan bulunamadı.</span>
      )}
    </div>
  );
};

export default Page;

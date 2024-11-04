import { getPropertiesForSale } from "@/actions";
import { Property } from "@/types";
import { PropertyCard } from "@/components/listing-page/property-card";

const Page = async () => {
  const properties = await getPropertiesForSale();
  const p = JSON.parse(JSON.stringify(properties)) as Property[];

  return (
    <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-center">
      {properties.length ? (
        <div className="flex h-full w-full flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold sm:text-3xl">
              Satılık İlanlar - {p.length}
            </h2>
          </div>
          <div className="grid h-full w-full flex-1 grid-cols-1 gap-4 overflow-auto rounded-lg border border-border p-0 backdrop-blur-3xl sm:p-4 md:grid-cols-2 xl:grid-cols-3">
            {p.map((property) => (
              <PropertyCard
                property={property}
                key={`property-${property._id}`}
              />
            ))}
          </div>
        </div>
      ) : (
        <span className="text-xl font-bold">Kiralık ilan bulunamadı.</span>
      )}
    </div>
  );
};

export default Page;

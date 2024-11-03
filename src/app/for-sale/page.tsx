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
              Satılık İlanlar
            </h2>
          </div>
          <div className="grid h-full w-full flex-1 grid-cols-1 gap-4 overflow-auto rounded-lg p-0 shadow-[10px_0px_25px_0px_rgba(0,0,0,0.25)] dark:shadow-[10px_0px_25px_0px_rgba(255,255,255,0.25)] sm:p-4 md:grid-cols-2 xl:grid-cols-3">
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

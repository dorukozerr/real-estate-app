import { getProperties } from "@/actions";
import { Property } from "@/types";
import { CardsSlider } from "@/components/home/cards-slider";

const Page = async () => {
  const properties = await getProperties({ mode: "all" });
  const p = JSON.parse(JSON.stringify(properties)) as Property[];

  return (
    <main className="flex min-h-full w-full grow flex-col items-center gap-8 overflow-auto overflow-x-hidden px-4 py-8 sm:gap-16 sm:py-16">
      <h1 className="mx-auto w-[min(500px,90vw)] text-center text-3xl font-semibold sm:w-[min(900px,90vw)] sm:text-5xl md:text-7xl">
        Emluck&apos;a hoşgeldiniz, özel ilanlarımıza bir göz atın
      </h1>
      <CardsSlider
        properties={p.length ? p.filter((property) => property.isFeatured) : []}
      />
      <div className="flex h-max w-max items-center justify-center gap-16 rounded-md border border-border p-4">
        <div className="flex flex-col items-start justify-start">
          <span className="text-xl font-thin text-muted-foreground">
            Satılık İlanlar
          </span>
          <span className="text-7xl font-bold">
            {p.filter((property) => !property.isForRent).length}
          </span>
        </div>
        <div className="flex flex-col items-start justify-start">
          <span className="text-xl font-thin text-muted-foreground">
            Kiralık İlanlar
          </span>
          <span className="text-7xl font-bold">
            {p.filter((property) => property.isForRent).length}
          </span>
        </div>
      </div>
    </main>
  );
};

export default Page;

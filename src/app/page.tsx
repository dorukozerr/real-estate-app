import { getFeaturedProperties, getProperties } from "@/actions";
import { Property } from "@/types";
import { CardsSlider } from "@/components/home/cards-slider";

const Home = async () => {
  const featuredProperties = await getFeaturedProperties();
  const properties = (await getProperties()) as unknown as Property[];
  const fp = JSON.parse(JSON.stringify(featuredProperties)) as Property[];

  return (
    <main className="flex min-h-full w-full grow flex-col items-center gap-4 overflow-auto overflow-x-hidden p-4 py-4 sm:gap-16 sm:py-16">
      <h1 className="mx-auto w-[300px] text-center text-2xl font-bold sm:w-[550px] sm:text-4xl">
        Emluck&apos;a hoşgeldiniz,{" "}
        <span className="font-bold italic underline">özel ilanlarımıza</span>{" "}
        bir göz atın
      </h1>
      <CardsSlider properties={fp} />
      <div className="flex h-max w-full items-center justify-center gap-16">
        <div className="flex flex-col items-start justify-start">
          <span className="text-xl font-thin text-muted-foreground">
            Satılık İlanlar
          </span>
          <span className="text-7xl font-bold">
            {properties.filter((property) => !property.isForRent).length}
          </span>
        </div>
        <div className="flex flex-col items-start justify-start">
          <span className="text-xl font-thin text-muted-foreground">
            Kiralık İlanlar
          </span>
          <span className="text-7xl font-bold">
            {properties.filter((property) => property.isForRent).length}
          </span>
        </div>
      </div>
    </main>
  );
};

export default Home;

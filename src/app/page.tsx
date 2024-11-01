import { getFeaturedProperties } from "@/actions";
import { CardsSlider } from "@/components/home/cards-slider";

const Home = async () => {
  const featuredProperties = await getFeaturedProperties();
  const fp = JSON.parse(JSON.stringify(featuredProperties));

  console.log("fp =>", fp);

  return (
    <main className="flex min-h-full w-full grow flex-col items-center gap-4 overflow-auto overflow-x-hidden p-4 py-4 sm:gap-16 sm:py-16">
      <h1 className="mx-auto w-[300px] text-center text-2xl font-bold sm:w-[450px] sm:text-4xl">
        Welcome to <span className="font-mono italic underline">BEST</span> real
        estate portfolio site
      </h1>
      <h4 className="w-full text-center text-xl">
        Dont waste time with meaningless content clutter, just start browsing!
      </h4>
      <CardsSlider />
    </main>
  );
};

export default Home;

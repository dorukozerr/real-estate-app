import { getPropertiesForRent } from "@/actions";

const Page = async () => {
  const properties = await getPropertiesForRent();

  console.log("properties =>", properties);

  return (
    <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-center">
      {properties.length ? (
        <div className="flex h-full w-full flex-col gap-4 border border-red-500 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-3xl">Kiralık İlanlar</h2>
          </div>
          <div className="grid h-full w-full flex-1 grid-cols-1 gap-4 overflow-auto border-4 border-red-500 md:grid-cols-2 lg:grid-cols-3">
            <div className="h-[550px] border-4 border-red-500"></div>
            <div className="h-[550px] border-4 border-red-500"></div>
            <div className="h-[550px] border-4 border-red-500"></div>
            <div className="h-[550px] border-4 border-red-500"></div>
            <div className="h-[550px] border-4 border-red-500"></div>
            <div className="h-[550px] border-4 border-red-500"></div>
            <div className="h-[550px] border-4 border-red-500"></div>
            <div className="h-[550px] border-4 border-red-500"></div>
            <div className="h-[550px] border-4 border-red-500"></div>
            <div className="h-[550px] border-4 border-red-500"></div>
            <div className="h-[550px] border-4 border-red-500"></div>
            <div className="h-[550px] border-4 border-red-500"></div>
            <div className="h-[550px] border-4 border-red-500"></div>
            <div className="h-[550px] border-4 border-red-500"></div>
          </div>
        </div>
      ) : (
        <span className="text-xl font-bold">Kiralık ilan bulunamadı.</span>
      )}
    </div>
  );
};

export default Page;

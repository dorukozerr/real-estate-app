import { notFound } from "next/navigation";
import { getProperty, getProperties } from "@/actions";
import { Property } from "@/types";

export const generateStaticParams = async () => {
  const properties = await getProperties({ mode: "all" });
  const p = JSON.parse(JSON.stringify(properties)) as Property[];

  return p.length
    ? p.map(({ _id }) => ({
        id: _id ? _id : "",
      }))
    : [{ id: "" }];
};

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  if (id.length !== 24) {
    notFound();
  }

  const property = await getProperty(id);
  const p = JSON.parse(JSON.stringify(property)) as Property;

  if (!property) {
    notFound();
  }

  return (
    <div className="mx-auto h-full w-full max-w-[1440px] text-wrap border border-red-500">
      {JSON.stringify(p)}
    </div>
  );
};

export default Page;

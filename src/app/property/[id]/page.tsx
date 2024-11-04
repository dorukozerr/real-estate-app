import { notFound } from "next/navigation";
import { getProperty } from "@/actions";
import { Property } from "@/types";

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

  return <div className="text-wrap">{JSON.stringify(p)}</div>;
};

export default Page;

import { getProperty } from "@/actions";
import { Property } from "@/types";

const Page = async ({ params }: { params: { id: string } }) => {
  const property = await getProperty(params.id);
  const p = JSON.parse(JSON.stringify(property)) as Property;

  return <div className="text-wrap">{JSON.stringify(p)}</div>;
};

export default Page;

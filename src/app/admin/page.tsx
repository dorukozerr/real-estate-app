import { getProperties } from "@/actions";
import { Property } from "@/types";
import { Authentication } from "@/components/admin/authentication";

const Page = async () => {
  const properties = await getProperties();
  const p = JSON.parse(JSON.stringify(properties)) as Property[];

  return (
    <div className="mx-auto h-full w-full max-w-[1440px] overflow-auto p-4">
      <Authentication properties={p} />
    </div>
  );
};

export default Page;

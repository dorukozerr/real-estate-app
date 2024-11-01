import { getProperties } from "@/actions";
import { Property } from "@/types";
import AdminPropertyList from "./AdminPropertyList";

export default async function AdminProperties() {
  const properties = await getProperties();
  const p = JSON.parse(JSON.stringify(properties));

  return (
    <div className="mx-auto h-full w-full max-w-[1440px] overflow-auto p-4">
      <AdminPropertyList initialProperties={p as unknown as Property[]} />
    </div>
  );
}

import { getProperties, checkAuth } from "@/actions";
import { Property } from "@/types";
import { LoginForm } from "@/components/admin/login-form";
import { AdminPage } from "@/components/admin/admin-page";

const Page = async () => {
  const properties = await getProperties();
  const p = JSON.parse(JSON.stringify(properties)) as Property[];

  const isAuthenticated = await checkAuth();

  return (
    <div className="mx-auto h-full w-full max-w-[1440px] overflow-auto p-4">
      {isAuthenticated ? <AdminPage properties={p} /> : <LoginForm />}
    </div>
  );
};

export default Page;

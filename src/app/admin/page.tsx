import dynamic from "next/dynamic";
import { getProperties, checkAuth } from "@/actions";
import { Property } from "@/types";

const LoginForm = dynamic(
  () => import("@/components/admin/login-form").then((mod) => mod.LoginForm),
  { ssr: false }
);

const AdminPage = dynamic(
  () => import("@/components/admin/admin-page").then((mod) => mod.AdminPage),
  { ssr: false }
);

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

import Link from "next/link";
import { Button } from "@/components/ui/button";

const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center">
    <h2 className="max-x-[90vw] mb-4 text-center text-4xl font-bold">
      404 - Sayfa Bulunamadı
    </h2>
    <p className="max-[90vw] mb-4 text-center">
      Oops! Aradığınız sayfa bulunamadı :(
    </p>
    <Link href="/" className="text-blue-500 underline hover:text-blue-700">
      <Button>Ana Sayfaya Dön</Button>
    </Link>
  </div>
);

export default NotFound;

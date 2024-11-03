import Link from "next/link";
import { Button } from "@/components/ui/button";

const NotFound = () => (
  <div className="flex h-full w-full flex-col items-center justify-center gap-4">
    <h2 className="max-x-[90vw] text-center text-xl font-bold sm:text-4xl">
      404 - Sayfa Bulunamadı
    </h2>
    <p className="max-[90vw] text-center">
      Oops! Aradığınız sayfa bulunamadı :(
    </p>
    <Link href="/" className="text-blue-500 underline hover:text-blue-700">
      <Button>Ana Sayfaya Dön</Button>
    </Link>
  </div>
);

export default NotFound;

import { notFound } from "next/navigation";
import { getProperty, getProperties } from "@/actions";
import { Property } from "@/types";
import { ImageSlider } from "@/components/details/image-slider";
import { Badge } from "@/components/ui/badge";

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
    <div className="mx-auto flex h-full w-full max-w-[1440px] flex-col items-start justify-start gap-4 p-4 lg:flex-row">
      <div className="h-full w-full lg:min-w-[60%]">
        <ImageSlider imageUrls={p.imageUrls} />
      </div>
      <div className="h-full w-full overflow-auto">
        <div className="flex h-max w-full flex-col gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            {p.title}
          </h1>
          <h2 className="text-base font-medium text-muted-foreground sm:text-lg">
            {p.location}
          </h2>
          <div className="flex items-center justify-between gap-2">
            <span className="text-xl font-semibold text-primary sm:text-2xl">
              {p.price.toLocaleString()} ₺
            </span>
            <div className="flex items-center justify-between gap-2">
              <Badge className="text-sm font-medium sm:text-base">
                {p.roomCount}
              </Badge>
              <Badge className="text-sm font-medium sm:text-base">
                {p.isForRent ? "Kiralık" : "Satılık"}
              </Badge>
            </div>
          </div>
          <p className="whitespace-break-spaces">{p.description}</p>
          <div className="flex flex-wrap items-center justify-start gap-2">
            {p.tags.map((tag, tagIndex) => (
              <Badge
                key={`tagBadge-${tagIndex}`}
                className="text-xs font-medium tracking-wide sm:text-sm"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

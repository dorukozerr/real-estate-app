import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Property } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

// <ImageKitProvider
//   urlEndpoint={urlEndpoint}
//   publicKey={publicKey}
//   authenticator={imagekitioAuthenticator}
// >
//   <div>
//     <IKUpload
//       onError={(err) => console.error("Image Upload Error =>", err)}
//       onSuccess={(res) => {
//         console.log("Image Upload Success =>", res);
//         setProperty((prevState) => ({
//           ...prevState,
//           imageUrls: [...(prevState.imageUrls as Array<string>), res.url],
//         }));
//       }}
//     />
//   </div>
// </ImageKitProvider>;

const formSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters.",
    })
    .max(250, { message: "Title must be lower than 250 characters." }),
  price: z.string().transform((v) => Number(v) || 0),
  location: z
    .string()
    .min(3, { message: "Location must be at least 3 characters." })
    .max(150, { message: "Location must be lower than 150 characters." }),
  imageUrls: z
    .array(z.string())
    .min(1, { message: "There should be atleast 1 image." }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters" })
    .max(500, { message: "Description must be lower than 500 characters." }),
  isFeatured: z.boolean(),
  isForRent: z.boolean(),
  roomCount: z
    .string()
    .min(1, { message: "Room Count must be at least 1 character." })
    .max(100, { message: "Room Count must be lower than 100 characters." }),
  tags: z
    .array(z.string())
    .min(1, { message: "There should be atleast 1 tag." }),
});

const initialPropertyData = {
  title: "",
  price: 0,
  location: "",
  imageUrls: [],
  description: "",
  isFeatured: false,
  isForRent: false,
  roomCount: "",
  tags: [],
};

export const PropertyDialog = ({
  open,
  onOpenChange,
  mode,
  property,
}: {
  open: boolean;
  onOpenChange: (flag: boolean) => void;
  mode: "create" | "edit" | "";
  property: Property | null;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialPropertyData,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("onSubmit =>", values);
  }

  console.log("property =>", property, mode);

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="flex max-h-[min(800px,80vh)] min-h-[min(800px,80vh)] min-w-[min(850px,80vw)] max-w-[min(850px,80vw)] flex-col">
        <DialogHeader className="h-max w-full">
          <DialogTitle>
            {mode === "create"
              ? "Create Property"
              : mode === "edit" && "Edit Property"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid h-full w-full flex-1 grid-cols-1 items-start justify-start gap-4 sm:grid-cols-2 md:grid-cols-3"
          >
            <div className="h-max">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title..." {...field} />
                    </FormControl>
                    <FormDescription>Title of the property</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="h-max">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Price..." {...field} />
                    </FormControl>
                    <FormDescription>
                      Price of the property as ₺.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="h-max">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Location..." {...field} />
                    </FormControl>
                    <FormDescription>Location of the property.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="hidden"></Button>
          </form>
        </Form>
        <div className=""></div>
        <DialogFooter className="h-max w-full">
          <Button onClick={() => form.handleSubmit(onSubmit)()}>
            {mode === "create" ? "Submit" : mode === "edit" && "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

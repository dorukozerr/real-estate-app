import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { ImageKitProvider, IKUpload } from "imagekitio-next";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircledIcon, Cross2Icon } from "@radix-ui/react-icons";
import { imagekitioAuthenticator } from "@/lib/imagekitio-authenticator";
import { createProperty, updateProperty } from "@/actions";
import { Property } from "@/types";
import {
  Dialog,
  DialogDescription,
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

const formSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters.",
    })
    .max(250, { message: "Title must be lower than 250 characters." }),
  price: z.number().min(0, { message: "Price should be positive." }),
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
  onOpenChange: () => void;
  mode: "create" | "edit" | "";
  property: null | Property;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialPropertyData,
  });

  const imgKitBtnRef = useRef<HTMLInputElement>(null);
  const [tagInput, setTagInput] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);

  useEffect(() => {
    if (mode === "edit" && property) {
      form.reset(property);
    } else {
      form.reset(initialPropertyData);
    }
  }, [mode, property, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsPending(true);
    try {
      if (mode === "create") {
        const res = await createProperty(values);
        if (res.acknowledged) {
          toast("Success!", {
            description: "Property created successfully, YAY!!",
          });
          onOpenChange();
        } else {
          throw new Error("Failed to create property");
        }
      } else if (mode === "edit" && property) {
        const res = await updateProperty(property._id!, values);
        if (res.acknowledged) {
          toast("Success!", {
            description: "Property updated successfully!",
          });
          onOpenChange();
        } else {
          throw new Error("Failed to update property");
        }
      }
    } catch (err) {
      console.error("propert onSubmit err =>", err);
      toast("Error...", {
        description: "Something went wrong. Please try again.",
        action: {
          label: "Try Again",
          onClick: () => form.handleSubmit(onSubmit)(),
        },
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="flex max-h-[min(800px,80vh)] min-h-[min(800px,80vh)] min-w-[min(850px,80vw)] max-w-[min(850px,80vw)] flex-col">
        <DialogHeader className="h-full w-full">
          <DialogTitle>
            {mode === "create"
              ? "Create Property"
              : mode === "edit" && "Edit Property"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Please fill all the fields then submit your property."
              : mode === "edit" &&
                "Edit your property then submit changes when you're done."}
          </DialogDescription>
        </DialogHeader>
        <div className="h-full overflow-auto rounded-md border border-border p-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid h-full w-full flex-1 auto-rows-min grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3"
            >
              <div className="h-max">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Osmanbey Kelepir Daire"
                          {...field}
                        />
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
                        <Input
                          type="number"
                          placeholder="Keşke bedava olsa."
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Price of the property as ₺. If you cant delete 0 do
                        control + a then try to type a number
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
                        <Input placeholder="Şişli" {...field} />
                      </FormControl>
                      <FormDescription>
                        District or street, maybe even both.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="row-span-2">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex h-full flex-col">
                      <FormLabel>Description</FormLabel>
                      <FormControl className="flex-1">
                        <Textarea
                          className="resize-none"
                          placeholder={`- Eski bina ama konumu iyi.\n- Kirası fena değil\n- Metroya 5 dk`}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Description for the property, try to write it like
                        placeholder text format. It&apos;ll be displayed like a
                        bulletlist.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="h-max">
                <FormField
                  control={form.control}
                  name="roomCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Count</FormLabel>
                      <FormControl>
                        <Input placeholder="1+1" {...field} />
                      </FormControl>
                      <FormDescription>
                        Room count, like 1+1, 2+1
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="h-max">
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Klimalı, kedili, cozy"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (
                                e.nativeEvent.code === "Enter" &&
                                tagInput !== ""
                              ) {
                                field.onChange([...field.value, tagInput]);
                                setTagInput("");
                                e.preventDefault();
                                e.stopPropagation();
                              }
                            }}
                          />
                          <PlusCircledIcon
                            onClick={() => {
                              if (tagInput !== "") {
                                field.onChange([...field.value, tagInput]);
                                setTagInput("");
                              }
                            }}
                            className="absolute right-4 top-1/2 h-[1.2rem] w-[1.2rem] -translate-y-1/2 cursor-pointer"
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Enter your tag then press enter or click the plus icon.
                        First tag should be square-meter of the property like
                        95m2.
                      </FormDescription>
                      <FormMessage />
                      <div className="flex h-max w-full gap-2 overflow-x-auto">
                        {field.value.map((tag, index) => (
                          <Badge
                            className="relative min-w-max py-2"
                            key={`tag-${index}`}
                          >
                            <span>{tag}</span>
                            <div
                              onClick={() => {
                                const oldTags = field.value;
                                const newTags = oldTags.filter(
                                  (_, tagIndex) => index !== tagIndex
                                );
                                field.onChange(newTags);
                              }}
                              className="absolute right-1 top-1 flex h-[0.6rem] w-[0.6rem] cursor-pointer items-center justify-center rounded-full border border-border"
                            >
                              <Cross2Icon />
                            </div>
                          </Badge>
                        ))}
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="h-max">
                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>Is Featured?</FormLabel>
                      <FormControl>
                        <div className="flex items-start gap-2">
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <FormDescription>
                            Show property on landing page?
                          </FormDescription>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="h-max">
                <FormField
                  control={form.control}
                  name="isForRent"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>Is For Renting?</FormLabel>
                      <FormControl>
                        <div className="flex items-start gap-2">
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <FormDescription>
                            Is property for renting? If its not for renting then
                            its for sale.
                          </FormDescription>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-3 h-full">
                <FormField
                  control={form.control}
                  name="imageUrls"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>Image URL&apos;s</FormLabel>
                      <FormControl>
                        <ImageKitProvider
                          urlEndpoint={urlEndpoint}
                          publicKey={publicKey}
                          authenticator={imagekitioAuthenticator}
                        >
                          <div className="flex items-center justify-start gap-4">
                            <IKUpload
                              ref={imgKitBtnRef}
                              validateFile={(file) => file.size < 2000000}
                              onError={(err) => {
                                setIsPending(false);
                                console.error("Image Upload Error =>", err);
                                toast("Error...", {
                                  description: JSON.stringify(err),
                                  action: {
                                    label: "Try Again",
                                    onClick: () =>
                                      imgKitBtnRef?.current?.click(),
                                  },
                                });
                              }}
                              onSuccess={(res) => {
                                setIsPending(false);
                                console.log("Image Upload Success =>", res);
                                field.onChange([...field.value, res.url]);
                                toast("Success!", {
                                  description: "Image uploaded succesfully.",
                                });
                              }}
                              onUploadStart={() => setIsPending(true)}
                              className="hidden"
                            />

                            {imgKitBtnRef && (
                              <Button
                                type="button"
                                disabled={isPending}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  imgKitBtnRef?.current?.click();
                                }}
                              >
                                {isPending ? "Uploading..." : "Upload Image"}
                              </Button>
                            )}
                            <FormDescription>
                              Images will be shown in the same order of
                              uploading. You can delete and re-upload them to
                              arrange order.
                            </FormDescription>
                          </div>
                        </ImageKitProvider>
                      </FormControl>
                      <FormMessage />
                      <div className="flex items-center justify-start gap-4 overflow-x-auto p-4">
                        {field.value.length
                          ? field.value.map((img, imgIndex) => (
                              <div
                                key={`propertyImg-${imgIndex}`}
                                className="relative"
                              >
                                <Image
                                  alt={`propertyImg-${imgIndex}`}
                                  src={img}
                                  height={75}
                                  width={75}
                                />
                                <div
                                  onClick={() => {
                                    const oldImgs = field.value;
                                    const newImgs = oldImgs.filter(
                                      (_, index) => imgIndex !== index
                                    );
                                    field.onChange(newImgs);
                                  }}
                                  className="absolute -right-2 -top-2 flex h-[1rem] w-[1rem] cursor-pointer items-center justify-center rounded-full border border-border"
                                >
                                  <Cross2Icon />
                                </div>
                              </div>
                            ))
                          : null}
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <button type="submit" className="hidden"></button>
            </form>
          </Form>
        </div>
        <DialogFooter className="h-full w-full">
          <Button
            disabled={isPending}
            onClick={() => form.handleSubmit(onSubmit)()}
          >
            {mode === "create" ? "Submit" : mode === "edit" && "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

import { Property } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

const initialPropertyData = {
  title: "",
  price: 0,
  location: "",
  imageUrls: [],
  description: "",
  isFeatured: false,
  isForRent: false,
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
  console.log("property =>", property, mode);

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="">
        <DialogHeader className="">
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog Description</DialogDescription>
        </DialogHeader>
        <div className=""></div>
        <DialogFooter className="">Dialog Footer</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

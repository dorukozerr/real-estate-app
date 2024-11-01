"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageKitProvider, IKUpload } from "imagekitio-next";
import { createProperty, updateProperty, deleteProperty } from "@/actions";
import { Property } from "@/types";
import { imagekitioAuthenticator } from "@/lib/imagekitio-authenticator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

export const AdminPage = ({ properties }: { properties: Property[] }) => {
  console.log("properties =>", properties);

  return <div className="h-full w-full border-4 border-red-500"></div>;
};

"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageKitProvider, IKUpload } from "imagekitio-next";
import { Plus } from "lucide-react";
import { createProperty, updateProperty, deleteProperty } from "@/actions";
import { Property } from "@/types";
import { imagekitioAuthenticator } from "@/lib/imagekitio-authenticator";
import { PropertyDialog } from "@/components/admin/property-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export const AdminPage = ({ properties }: { properties: Property[] }) => {
  const [dialogState, setDialogState] = useState({
    mode: "",
    open: false,
    property: null,
  });

  console.log("properties =>", properties);

  return (
    <>
      <div className="h-full w-full">
        <div className="flex w-full items-center justify-end">
          <Button variant="outline" size="icon">
            <Plus className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </div>
      </div>
      <PropertyDialog
        open={dialogState.open}
        onOpenChange={(flag) =>
          setDialogState((prevState) => ({ ...prevState, open: flag }))
        }
        property={dialogState.property}
      />
    </>
  );
};

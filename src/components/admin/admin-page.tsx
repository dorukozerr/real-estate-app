"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageKitProvider, IKUpload } from "imagekitio-next";
import { Plus } from "lucide-react";
import {
  CheckIcon,
  Cross2Icon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import { createProperty, updateProperty, deleteProperty } from "@/actions";
import { Property } from "@/types";
import { imagekitioAuthenticator } from "@/lib/imagekitio-authenticator";
import { PropertyDialog } from "@/components/admin/property-dialog";
import { DeleteDialog } from "@/components/admin/delete-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const AdminPage = ({ properties }: { properties: Property[] }) => {
  const [propertyDialogState, setPropertyDialogState] = useState<{
    mode: "create" | "edit" | "";
    open: boolean;
    property: Property | null;
  }>({
    mode: "",
    open: false,
    property: null,
  });
  const [deleteDialogState, setDeleteDialogState] = useState<{
    open: boolean;
    id: string;
  }>({
    open: false,
    id: "",
  });

  const renderActions = (property: Property) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <DotsHorizontalIcon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() =>
            setPropertyDialogState({ mode: "edit", open: true, property })
          }
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            setDeleteDialogState({
              open: true,
              id: property._id ? property._id : "",
            })
          }
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
  const renderStr = (str: string) => str;
  const renderNumber = (num: number) => `₺${num?.toLocaleString()}`;
  const renderImageUrls = (arr: string[]) => arr.length;
  const renderBoolean = (flag: boolean) =>
    flag ? (
      <Badge>
        <CheckIcon className="h-[1.2rem] w-[1.2rem]" />
      </Badge>
    ) : (
      <Badge>
        <Cross2Icon className="h-[1.2rem] w-[1.2rem]" />
      </Badge>
    );
  const renderDate = (timestamp: string) =>
    new Date(timestamp).toLocaleDateString("tr-TR");
  const renderTags = (tags: string[]) => (
    <div className="flex items-center justify-center gap-2">
      {tags?.map((tag, index) => <Badge key={`badge-${index}`}>{tag}</Badge>)}
    </div>
  );

  const fields = [
    { field: "", render: renderActions },
    { field: "title", render: renderStr },
    { field: "price", render: renderNumber },
    { field: "location", render: renderStr },
    { field: "imageUrls", render: renderImageUrls },
    { field: "description", render: renderStr },
    { field: "isFeatured", render: renderBoolean },
    { field: "isForRent", render: renderBoolean },
    { field: "createdAt", render: renderDate },
    { field: "roomCount", render: renderNumber },
    { field: "tags", render: renderTags },
  ] as const;

  return (
    <>
      <div className="flex h-full w-full flex-col items-start justify-start gap-4">
        <div className="flex w-full items-center justify-end">
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setPropertyDialogState({
                mode: "create",
                open: true,
                property: null,
              })
            }
          >
            <Plus className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </div>
        <div className="w-full flex-1">
          {properties.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  {fields.map(({ field }, index) => (
                    <TableHead
                      key={`tableHeaderCell-${index}`}
                      className="capitalize"
                    >
                      {field.replace(/([A-Z])/g, " $1").trim()}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {properties.map((property, index) => (
                  <TableRow key={`tableRow-${index}`}>
                    {fields.map(({ field, render }, index) => (
                      <TableCell
                        className="whitespace-pre-line"
                        key={`tableCell-${index}`}
                      >
                        {field !== ""
                          ? render(property[field as never])
                          : render(property)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xl">
              There is no property, please create one.
            </div>
          )}
        </div>
        {/*
        <div className="flex w-full items-center justify-end">
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setPropertyDialogState({
                mode: "create",
                open: true,
                property: null,
              })
            }
          >
            <Plus className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </div>
        */}
      </div>
      <PropertyDialog
        open={propertyDialogState.open}
        onOpenChange={(flag) =>
          setPropertyDialogState({
            open: flag,
            property: null,
            mode: "",
          })
        }
        mode={propertyDialogState.mode}
        property={propertyDialogState.property}
      />
      <DeleteDialog
        open={deleteDialogState.open}
        onOpenChange={(flag) => setDeleteDialogState({ open: flag, id: "" })}
        id={deleteDialogState.id}
      />
    </>
  );
};

"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import {
  CheckIcon,
  Cross2Icon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import { logout } from "@/actions";
import { Property } from "@/types";
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
  const [propertyDialogState, setPropertyDialogState] = useState<
    | { mode: "create"; open: boolean; property: null }
    | { mode: "edit"; open: boolean; property: Property }
    | { mode: ""; open: boolean; property: null }
  >({
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

  const renderMethods = {
    actions: (property: Property) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <DotsHorizontalIcon className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() =>
              setPropertyDialogState({
                mode: "edit",
                open: true,
                property,
              })
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
    ),
    string: (str: string) => str,
    price: (num: number) => `${num?.toLocaleString("tr")} ₺`,
    imageUrls: (arr: string[]) => arr.length,
    boolean: (flag: boolean) =>
      flag ? (
        <Badge>
          <CheckIcon className="h-[1.2rem] w-[1.2rem]" />
        </Badge>
      ) : (
        <Badge>
          <Cross2Icon className="h-[1.2rem] w-[1.2rem]" />
        </Badge>
      ),
    date: (timestamp: string) => new Date(timestamp).toLocaleDateString("tr"),
    tags: (tags: string[]) => (
      <div className="flex items-center justify-start gap-2">
        {tags?.map((tag, index) => <Badge key={`badge-${index}`}>{tag}</Badge>)}
      </div>
    ),
  };

  const fields = [
    { field: "", render: renderMethods.actions },
    { field: "title", render: renderMethods.string },
    { field: "price", render: renderMethods.price },
    { field: "location", render: renderMethods.string },
    { field: "imageUrls", render: renderMethods.imageUrls },
    { field: "description", render: renderMethods.string },
    { field: "isFeatured", render: renderMethods.boolean },
    { field: "isForRent", render: renderMethods.boolean },
    { field: "createdAt", render: renderMethods.date },
    { field: "roomCount", render: renderMethods.string },
    { field: "tags", render: renderMethods.tags },
  ] as const;

  return (
    <>
      <div className="flex h-full w-full flex-col items-start justify-start gap-4">
        <div className="flex w-full items-center justify-end gap-4">
          <Button
            variant="outline"
            onClick={() =>
              setPropertyDialogState({
                mode: "create",
                open: true,
                property: null,
              })
            }
          >
            <Plus className="h-[1.2rem] w-[1.2rem]" />
            <span>Add Property</span>
          </Button>
          <Button variant="outline" onClick={async () => await logout()}>
            Logout
          </Button>
        </div>
        {properties.length ? (
          <div className="flex w-full flex-1 flex-col overflow-auto rounded-md border border-border">
            <Table className="relative flex-1 overflow-auto">
              <TableHeader className="sticky top-[-1px] overflow-hidden rounded-md border-border bg-background after:absolute after:bottom-0 after:h-[1px] after:w-full after:bg-border after:content-['']">
                <TableRow>
                  {fields.map(({ field }, index) => (
                    <TableHead
                      key={`tableHeaderCell-${index}`}
                      className="text-nowrap capitalize"
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
                        className="whitespace-pre-line text-nowrap"
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
          </div>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4">
            <span className="text-2xl font-bold">
              Currently there is no property.
            </span>
            <Button
              onClick={() =>
                setPropertyDialogState({
                  mode: "create",
                  open: true,
                  property: null,
                })
              }
            >
              Create
            </Button>
          </div>
        )}
      </div>
      <PropertyDialog
        open={propertyDialogState.open}
        onOpenChange={() =>
          setPropertyDialogState({
            mode: "",
            open: false,
            property: null,
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

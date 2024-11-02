import { toast } from "sonner";
import { deleteProperty } from "@/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const DeleteDialog = ({
  open,
  onOpenChange,
  id,
}: {
  open: boolean;
  onOpenChange: (flag: boolean) => void;
  id: string;
}) => {
  const handleDelete = async () => {
    const res = await deleteProperty(id);

    if (res.acknowledged) {
      toast("Property has been deleted successfully.");
    } else {
      toast("Error...", {
        description: "Please try again",
        action: {
          label: "Try Again",
          onClick: () => handleDelete(),
        },
      });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            property and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

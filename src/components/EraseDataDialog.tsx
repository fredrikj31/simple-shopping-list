import { ReactNode, useState } from "react";
import { useEraseData } from "../hooks/useEraseData";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shadcn-ui/components/ui/dialog";
import { Button } from "@shadcn-ui/components/ui/button";
import { toast } from "sonner";

interface EraseDataDialogProps {
  triggerElement: ReactNode;
}
export const EraseDataDialog = ({ triggerElement }: EraseDataDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const { mutate: eraseData, isPending: isEraseDataPending } = useEraseData();

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{triggerElement}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Erase Data?</DialogTitle>
          <DialogDescription>
            This is gonna erase all data stored on this device. This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="justify-end flex flex-row">
          <Button
            variant="destructive"
            disabled={isEraseDataPending}
            onClick={() => {
              eraseData(undefined, {
                onError: (error: unknown) => {
                  toast.error("Error while erasing data");
                  console.error(error);
                  return;
                },
                onSuccess: () => {
                  toast.success("Successfully erased data");
                  setIsDialogOpen(false);
                  return;
                },
              });
            }}
          >
            Erase
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

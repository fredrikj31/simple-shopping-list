import { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shadcn-ui/components/ui/card";
import { Button } from "@shadcn-ui/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shadcn-ui/components/ui/dialog";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useDeleteList } from "../hooks/useDeleteList";

export const ListCard = ({
  list,
}: {
  list: { id: string; name: string; index: number };
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { mutate: deleteList, isPending: isDeleteListPending } =
    useDeleteList();

  return (
    <>
      <Card className="hover:bg-accent transition-colors cursor-pointer">
        <CardHeader>
          <div className="flex items-center gap-3">
            <ShoppingCart className="size-5 text-muted-foreground shrink-0" />
            <div className="flex-1">
              <CardTitle>{list.name}</CardTitle>
              <CardDescription>List #{list.index}</CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setConfirmOpen(true);
              }}
            >
              <Trash2 className="size-4 text-muted-foreground hover:text-destructive" />
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Stop React synthetic events from the portal bubbling up to the parent <Link> */}
      <div onClick={(e) => e.stopPropagation()}>
        <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete "{list.name}"?</DialogTitle>
              <DialogDescription>
                This will permanently delete the list and all its items. This
                action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="justify-end flex flex-row">
              <Button
                variant="destructive"
                onClick={() => deleteList({ listId: list.id })}
                disabled={isDeleteListPending}
              >
                Delete
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

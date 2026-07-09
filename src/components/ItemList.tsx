import { ReactNode, useState } from "react";
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
import { Checkbox } from "@shadcn-ui/components/ui/checkbox";
import { Badge } from "@shadcn-ui/components/ui/badge";
import { Trash2 } from "lucide-react";
import { ItemStore } from "../database/item";
import { useDeleteItem } from "../hooks/item/useDeleteItem";
import { useUpdateItem } from "../hooks/item/useUpdateItem";

interface ItemListProps {
  items: ItemStore["value"][];
}

export const ItemList = ({ items }: ItemListProps) => {
  if (items.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center px-4 py-12 text-center">
        <p className="text-sm text-muted-foreground">
          No items yet. Add your first item to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <ItemGroup items={items} />
    </div>
  );
};

interface ItemGroupProps {
  title?: string;
  icon?: ReactNode;
  items: ItemStore["value"][];
}

const ItemGroup = ({ title, icon, items }: ItemGroupProps) => {
  return (
    <div className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
      {title && (
        <div className="flex items-center gap-2 bg-muted px-4 py-3">
          {icon}
          <h2 className="flex-1 font-heading font-semibold text-foreground">
            {title}
          </h2>
          <Badge variant="muted">{items.length}</Badge>
        </div>
      )}
      <ul className="divide-y divide-border bg-card">
        {items.map((item) => (
          <ItemRow key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

const ItemRow = ({ item }: { item: ItemStore["value"] }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { mutate: deleteItem, isPending: isDeleteItemPending } = useDeleteItem({
    listId: item.listId,
  });
  const { mutate: updateItem } = useUpdateItem({ listId: item.listId });

  return (
    <li className="flex items-center gap-3 px-4 py-3">
      <Checkbox
        checked={item.completed}
        onCheckedChange={(checked) =>
          updateItem({ id: item.id, completed: checked === true })
        }
      />
      <span
        className={
          item.completed
            ? "flex-1 text-muted-foreground line-through"
            : "flex-1 text-foreground"
        }
      >
        {item.text}
      </span>
      <Button variant="ghost" size="icon" onClick={() => setConfirmOpen(true)}>
        <Trash2 className="size-4 text-muted-foreground hover:text-destructive" />
      </Button>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete "{item.text}"?</DialogTitle>
            <DialogDescription>
              This will permanently delete this item. This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="justify-end flex flex-row">
            <Button
              variant="destructive"
              onClick={() => deleteItem({ id: item.id })}
              disabled={isDeleteItemPending}
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
    </li>
  );
};

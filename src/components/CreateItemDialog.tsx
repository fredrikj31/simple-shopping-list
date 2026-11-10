import { Button } from "@shadcn-ui/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shadcn-ui/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@shadcn-ui/components/ui/field";
import { ReactNode, useMemo, useState } from "react";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useCreateItem } from "../hooks/item/useCreateItem";
import { useListItemsByListId } from "../hooks/item/useListItemsByListId";
import { CreatableCombobox } from "./CreatableCombobox";

const formSchema = z.object({
  text: z.string().min(1, "Item text must be at least 1 character."),
});

interface CreateItemDialogProps {
  listId: string;
  triggerElement: ReactNode;
}
export const CreateItemDialog = ({
  listId,
  triggerElement,
}: CreateItemDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  // Portal target for the combobox popup. It must live inside DialogContent so
  // the Radix modal's pointer-events lock, scroll lock and outside-click
  // dismissal treat the popup as part of the dialog.
  const [popupContainer, setPopupContainer] = useState<HTMLElement | null>(
    null,
  );

  const { mutate: createItem, isPending: isCreateItemPending } =
    useCreateItem();
  const { data: items } = useListItemsByListId({ listId });

  const suggestions = useMemo(() => {
    const seen = new Set<string>();
    const names: string[] = [];
    for (const item of items ?? []) {
      const text = item.text.trim();
      const key = text.toLowerCase();
      if (!text || seen.has(key)) continue;
      seen.add(key);
      names.push(text);
    }
    return names.sort((a, b) => a.localeCompare(b));
  }, [items]);

  const form = useForm({
    defaultValues: {
      text: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      const { text } = value;
      createItem(
        { listId, text, completed: false },
        {
          onError: (error) => {
            toast.error("Error while creating item");
            console.error(error);
            return;
          },
          onSuccess: () => {
            formApi.reset();
            toast.success("Successfully created item");
            setIsDialogOpen(false);
          },
        },
      );
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{triggerElement}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Item</DialogTitle>
        </DialogHeader>
        <form
          id="create-item-form"
          ref={setPopupContainer}
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="text"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Item</FieldLabel>
                  <CreatableCombobox
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onValueChange={field.handleChange}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                    suggestions={suggestions}
                    placeholder="Tomato"
                    container={popupContainer}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </form>
        <DialogFooter className="justify-end flex flex-row">
          <Button
            type="submit"
            form="create-item-form"
            disabled={isCreateItemPending}
          >
            Create
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

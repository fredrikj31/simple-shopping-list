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
import { Input } from "@shadcn-ui/components/ui/input";
import { ReactNode, useState } from "react";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useCreateItem } from "../hooks/item/useCreateItem";

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

  const { mutate: createItem, isPending: isCreateItemPending } =
    useCreateItem();

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
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Tomato"
                    autoComplete="off"
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

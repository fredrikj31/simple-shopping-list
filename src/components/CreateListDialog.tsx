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
import { listDatabase } from "../database/list";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1, "Name must be at least 1 character."),
});

interface CreateListDialogProps {
  triggerElement: ReactNode;
}
export const CreateListDialog = ({ triggerElement }: CreateListDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      name: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      const { name } = value;
      await listDatabase.createList({ name });

      formApi.reset();
      toast.success("Successfully created list");
      setIsDialogOpen(false);
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{triggerElement}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create List</DialogTitle>
        </DialogHeader>
        <form
          id="create-list-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="name"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Groceries"
                    autoComplete="off"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </form>
        <DialogFooter className="justify-end flex flex-row">
          <Button type="submit" form="create-list-form">
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

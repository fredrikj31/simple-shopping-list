import { useMutation } from "@tanstack/react-query";
import { itemDatabase } from "../../database/item";

export const useCreateItem = () => {
  return useMutation({
    mutationFn: itemDatabase.createItem,
  });
};

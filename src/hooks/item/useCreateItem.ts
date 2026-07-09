import { useMutation, useQueryClient } from "@tanstack/react-query";
import { itemDatabase } from "../../database/item";
import { queryKeys } from "../../constants/queryKeys";

export const useCreateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: itemDatabase.createItem,
    onSuccess: (_, { listId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.items.getItemsByListId(listId),
      });
    },
  });
};

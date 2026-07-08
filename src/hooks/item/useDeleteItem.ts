import { useMutation, useQueryClient } from "@tanstack/react-query";
import { itemDatabase } from "../../database/item";
import { queryKeys } from "../../constants/queryKeys";

export const useDeleteItem = ({ listId }: { listId: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: itemDatabase.deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.items.getItemsByListId(listId),
      });
    },
  });
};

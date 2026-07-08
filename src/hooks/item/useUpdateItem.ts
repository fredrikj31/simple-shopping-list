import { useMutation, useQueryClient } from "@tanstack/react-query";
import { itemDatabase } from "../../database/item";
import { queryKeys } from "../../constants/queryKeys";

export const useUpdateItem = ({ listId }: { listId: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: itemDatabase.updateItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.items.getItemsByListId(listId),
      });
    },
  });
};

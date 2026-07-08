import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteList } from "../api/deleteList";
import { queryKeys } from "../constants/queryKeys";

export const useDeleteList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteList,
    onSuccess: (_data, { listId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lists.list });
      queryClient.invalidateQueries({
        queryKey: queryKeys.items.getItemsByListId(listId),
      });
    },
  });
};

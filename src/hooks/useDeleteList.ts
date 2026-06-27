import { useMutation, useQueryClient } from "@tanstack/react-query";
import { listDatabase } from "../database/list";
import { queryKeys } from "../constants/queryKeys";

export const useDeleteList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: listDatabase.deleteList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lists.list });
    },
  });
};

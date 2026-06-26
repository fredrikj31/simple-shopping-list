import { useMutation, useQueryClient } from "@tanstack/react-query";
import { listDatabase } from "../database/list";
import { queryKeys } from "../constants/queryKeys";

export const useCreateList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: listDatabase.createList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lists.list });
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants/queryKeys";
import { eraseData } from "../api/eraseData";

export const useEraseData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: eraseData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lists.list });
    },
  });
};

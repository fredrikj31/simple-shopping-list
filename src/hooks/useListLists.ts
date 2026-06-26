import { useQuery } from "@tanstack/react-query";
import { listDatabase } from "../database/list";
import { queryKeys } from "../constants/queryKeys";

export const useListLists = () => {
  return useQuery({
    queryKey: queryKeys.lists.list,
    queryFn: listDatabase.listLists,
  });
};

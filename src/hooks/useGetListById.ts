import { useQuery } from "@tanstack/react-query";
import { listDatabase } from "../database/list";
import { queryKeys } from "../constants/queryKeys";

export const useGetListById = ({
  id,
}: Parameters<typeof listDatabase.getListById>[0]) => {
  return useQuery({
    queryKey: queryKeys.lists.getListById(id),
    queryFn: () => listDatabase.getListById({ id }),
  });
};

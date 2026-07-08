import { useQuery } from "@tanstack/react-query";
import { itemDatabase } from "../../database/item";
import { queryKeys } from "../../constants/queryKeys";

export const useListItemsByListId = ({
  listId,
}: Parameters<typeof itemDatabase.listItemsByListId>[0]) => {
  return useQuery({
    queryKey: queryKeys.items.getItemsByListId(listId),
    queryFn: () => itemDatabase.listItemsByListId({ listId }),
  });
};

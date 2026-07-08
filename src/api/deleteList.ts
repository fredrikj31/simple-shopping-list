import { itemDatabase } from "../database/item";
import { listDatabase } from "../database/list";

export interface DeleteListOptions {
  listId: string;
}
export const deleteList = async ({
  listId,
}: DeleteListOptions): Promise<void> => {
  await listDatabase.deleteList({ id: listId });
  await itemDatabase.deleteItemsByListId({ listId });
  return;
};

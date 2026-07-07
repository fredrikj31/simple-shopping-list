import { IDBPDatabase } from "idb";
import { ShoppingListDB } from "../..";
import { STORE_NAME } from "..";

export interface ListItemsByListIdOptions {
  listId: string;
}
export const listItemsByListId = async (
  db: IDBPDatabase<ShoppingListDB>,
  { listId }: ListItemsByListIdOptions,
) => {
  const items = await db.getAllFromIndex(STORE_NAME, "by-list-id", listId);
  return items;
};

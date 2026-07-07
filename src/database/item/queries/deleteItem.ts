import { IDBPDatabase } from "idb";
import { ShoppingListDB } from "../..";
import { STORE_NAME } from "..";

export interface DeleteItemOptions {
  id: string;
}
export const deleteItem = async (
  db: IDBPDatabase<ShoppingListDB>,
  { id }: DeleteItemOptions,
): Promise<void> => {
  await db.delete(STORE_NAME, id);
  return;
};

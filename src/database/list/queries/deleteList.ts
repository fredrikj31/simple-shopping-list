import { IDBPDatabase } from "idb";
import { ShoppingListDB } from "../..";
import { STORE_NAME } from "..";

export interface DeleteListOptions {
  id: string;
}
export const deleteList = async (
  db: IDBPDatabase<ShoppingListDB>,
  { id }: DeleteListOptions,
): Promise<void> => {
  await db.delete(STORE_NAME, id);
  return;
};

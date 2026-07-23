import { IDBPDatabase } from "idb";
import { ShoppingListDB } from "../..";
import { STORE_NAME } from "..";

export interface DeleteGroupOptions {
  id: string;
}
export const deleteGroup = async (
  db: IDBPDatabase<ShoppingListDB>,
  { id }: DeleteGroupOptions,
): Promise<void> => {
  await db.delete(STORE_NAME, id);
  return;
};

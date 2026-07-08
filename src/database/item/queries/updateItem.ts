import { IDBPDatabase } from "idb";
import { ShoppingListDB } from "../..";
import { STORE_NAME } from "..";

export interface UpdateItemOptions {
  id: string;
  completed: boolean;
}
export const updateItem = async (
  db: IDBPDatabase<ShoppingListDB>,
  { id, completed }: UpdateItemOptions,
): Promise<void> => {
  const item = await db.get(STORE_NAME, id);
  if (!item) throw new Error("Item does not exist");

  await db.put(STORE_NAME, { ...item, completed });
  return;
};

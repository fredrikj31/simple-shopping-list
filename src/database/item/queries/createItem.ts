import { IDBPDatabase } from "idb";
import { v4 as uuidv4 } from "uuid";
import { ShoppingListDB } from "../..";
import { STORE_NAME } from "..";
import { listDatabase } from "../../list";

export interface CreateItemOptions {
  listId: string;
  text: string;
  completed: boolean;
}
export const createItem = async (
  db: IDBPDatabase<ShoppingListDB>,
  { listId, text, completed }: CreateItemOptions,
): Promise<void> => {
  const list = await listDatabase.getListById({ id: listId });
  if (!list) throw new Error("List does not exists");

  const id = uuidv4();

  await db.add(STORE_NAME, { id, listId, text, completed });
  return;
};

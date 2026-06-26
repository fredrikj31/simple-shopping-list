import { IDBPDatabase } from "idb";
import { v4 as uuidv4 } from "uuid";
import { ShoppingListDB } from "../..";
import { listDatabase, STORE_NAME } from "..";

export interface CreateListOptions {
  name: string;
}
export const createList = async (
  db: IDBPDatabase<ShoppingListDB>,
  { name }: CreateListOptions,
): Promise<void> => {
  const currentLists = await listDatabase.listLists();

  const id = uuidv4();
  const index = currentLists.length;

  await db.add(STORE_NAME, { id, name, index });
  return;
};

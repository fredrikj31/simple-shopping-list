import { IDBPDatabase } from "idb";
import { v4 as uuidv4 } from "uuid";
import { ShoppingListDB } from "../..";
import { groupDatabase, STORE_NAME } from "..";

export interface CreateGroupOptions {
  name: string;
}
export const createGroup = async (
  db: IDBPDatabase<ShoppingListDB>,
  { name }: CreateGroupOptions,
): Promise<void> => {
  const currentGroups = await groupDatabase.listGroups();

  const id = uuidv4();
  const index = currentGroups.length;

  await db.add(STORE_NAME, { id, name, index });
  return;
};

import { IDBPDatabase } from "idb";
import { ShoppingListDB } from "../..";
import { STORE_NAME } from "..";

export const truncateLists = async (
  db: IDBPDatabase<ShoppingListDB>,
): Promise<void> => {
  await db.clear(STORE_NAME);
  return;
};

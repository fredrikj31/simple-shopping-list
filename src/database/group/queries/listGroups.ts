import { IDBPDatabase } from "idb";
import { ShoppingListDB } from "../..";
import { STORE_NAME } from "..";

export const listGroups = async (db: IDBPDatabase<ShoppingListDB>) => {
  const groups = await db.getAll(STORE_NAME);
  return groups;
};

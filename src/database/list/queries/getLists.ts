import { IDBPDatabase } from "idb";
import { ShoppingListDB } from "../..";
import { STORE_NAME } from "..";

export const getLists = async (db: IDBPDatabase<ShoppingListDB>) => {
  const lists = await db.getAll(STORE_NAME);
  return lists;
};

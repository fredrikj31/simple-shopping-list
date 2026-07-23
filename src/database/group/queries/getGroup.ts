import { IDBPDatabase } from "idb";
import { ShoppingListDB } from "../..";
import { STORE_NAME } from "..";

export interface GetGroupOptions {
  id: string;
}
export const getGroup = async (
  db: IDBPDatabase<ShoppingListDB>,
  { id }: GetGroupOptions,
) => {
  const group = await db.get(STORE_NAME, id);
  return group;
};

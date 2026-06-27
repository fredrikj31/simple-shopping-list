import { IDBPDatabase } from "idb";
import { ShoppingListDB } from "../..";
import { STORE_NAME } from "..";

export interface GetListByIdOptions {
  id: string;
}
export const getListById = async (
  db: IDBPDatabase<ShoppingListDB>,
  { id }: GetListByIdOptions,
) => {
  const list = await db.get(STORE_NAME, id);
  return list;
};

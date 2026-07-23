import { IDBPDatabase } from "idb";
import { ShoppingListDB } from "../..";
import { groupDatabase, STORE_NAME } from "..";

export interface UpdateGroupOptions {
  id: string;
  name: string | undefined;
}
export const updateGroup = async (
  db: IDBPDatabase<ShoppingListDB>,
  { id, name }: UpdateGroupOptions,
) => {
  const currentItem = await groupDatabase.getGroup({ id });

  const updatedName = name ?? currentItem?.name ?? "";

  const updatedGroup = await db.put(STORE_NAME, {
    id,
    name: updatedName,
    index: currentItem?.index ?? 0,
  });

  return updatedGroup;
};

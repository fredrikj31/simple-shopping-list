import { IDBPDatabase } from "idb";
import { ShoppingListDB } from "../..";
import { STORE_NAME } from "..";

export interface DeleteItemsByListIdOptions {
  listId: string;
}
export const deleteItemsByListId = async (
  db: IDBPDatabase<ShoppingListDB>,
  { listId }: DeleteItemsByListIdOptions,
): Promise<void> => {
  const tx = db.transaction(STORE_NAME, "readwrite");
  const index = tx.store.index("by-list-id");

  let cursor = await index.openCursor(listId);
  while (cursor) {
    await cursor.delete();
    cursor = await cursor.continue();
  }

  await tx.done;
};

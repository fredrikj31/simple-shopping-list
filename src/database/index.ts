import { openDB, type IDBPDatabase, type DBSchema } from "idb";
import { STORE_NAME as LIST_STORE, type ListStore } from "./list";
import { STORE_NAME as ITEM_STORE, type ItemStore } from "./item";

interface ShoppingListDB extends DBSchema {
  lists: ListStore;
  items: ItemStore;
}

let dbPromise: Promise<IDBPDatabase<ShoppingListDB>> | null = null;

const DB_NAME = "simple-shopping-list";
const DB_VERSION = 1;

export type { ShoppingListDB };

export const getDB = (): Promise<IDBPDatabase<ShoppingListDB>> => {
  if (!dbPromise) {
    dbPromise = openDB<ShoppingListDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        const listStore = db.createObjectStore(LIST_STORE, { keyPath: "id" });
        listStore.createIndex("by-index", "index");

        const itemStore = db.createObjectStore(ITEM_STORE, { keyPath: "id" });
        itemStore.createIndex("by-list-id", "listId");
      },
    });
  }
  return dbPromise;
};

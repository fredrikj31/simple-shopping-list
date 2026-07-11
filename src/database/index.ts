import { openDB, type IDBPDatabase, type DBSchema } from "idb";
import { STORE_NAME as LIST_STORE, type ListStore } from "./list";
import { STORE_NAME as ITEM_STORE, type ItemStore } from "./item";
import { STORE_NAME as GROUP_STORE, type GroupStore } from "./group";

interface ShoppingListDB extends DBSchema {
  lists: ListStore;
  items: ItemStore;
  groups: GroupStore;
}

let dbPromise: Promise<IDBPDatabase<ShoppingListDB>> | null = null;

const DB_NAME = "simple-shopping-list";
const DB_VERSION = 1;

export type { ShoppingListDB };

export const getDB = (): Promise<IDBPDatabase<ShoppingListDB>> => {
  if (!dbPromise) {
    dbPromise = openDB<ShoppingListDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // List Store
        const listStore = db.createObjectStore(LIST_STORE, { keyPath: "id" });
        listStore.createIndex("by-index", "index");

        // Item Store
        const itemStore = db.createObjectStore(ITEM_STORE, { keyPath: "id" });
        itemStore.createIndex("by-list-id", "listId");

        // Group Store
        db.createObjectStore(GROUP_STORE, { keyPath: "id" });
      },
    });
  }
  return dbPromise;
};

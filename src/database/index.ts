import { openDB, type IDBPDatabase } from "idb";
import { STORE_NAME as LIST_STORE, type ListStore } from "./list";

interface ShoppingListDB {
  lists: ListStore;
}

let dbPromise: Promise<IDBPDatabase<ShoppingListDB>> | null = null;

const DB_NAME = "simple-shopping-list";
const DB_VERSION = 1;

export type { ShoppingListDB };

export const getDB = (): Promise<IDBPDatabase<ShoppingListDB>> => {
  if (!dbPromise) {
    dbPromise = openDB<ShoppingListDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        const store = db.createObjectStore(LIST_STORE, { keyPath: "id" });
        store.createIndex("by-index", "index");
      },
    });
  }
  return dbPromise;
};

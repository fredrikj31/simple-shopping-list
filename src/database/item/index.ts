import { getDB } from "..";
import { createItem, CreateItemOptions } from "./queries/createItem";
import { deleteItem, DeleteItemOptions } from "./queries/deleteItem";
import {
  listItemsByListId,
  ListItemsByListIdOptions,
} from "./queries/listItemsByListId";
import { updateItem, UpdateItemOptions } from "./queries/updateItem";

export const STORE_NAME = "items" as const;

export interface ItemStore {
  key: string;
  value: { id: string; listId: string; text: string; completed: boolean };
  indexes: { "by-list-id": string };
}

export const itemDatabase = {
  createItem: async (options: CreateItemOptions) => {
    return createItem(await getDB(), options);
  },

  listItemsByListId: async (options: ListItemsByListIdOptions) => {
    return listItemsByListId(await getDB(), options);
  },

  deleteItem: async (options: DeleteItemOptions) => {
    return deleteItem(await getDB(), options);
  },

  updateItem: async (options: UpdateItemOptions) => {
    return updateItem(await getDB(), options);
  },
};

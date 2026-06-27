import { getDB } from "../index";
import { createList, CreateListOptions } from "./queries/createList";
import { deleteList, DeleteListOptions } from "./queries/deleteList";
import { getListById, GetListByIdOptions } from "./queries/getListById";
import { listLists } from "./queries/listLists";

export const STORE_NAME = "lists" as const;

export interface ListStore {
  key: string;
  value: { id: string; name: string; index: number };
  indexes: { "by-index": number };
}

export const listDatabase = {
  createList: async (options: CreateListOptions) => {
    return createList(await getDB(), options);
  },

  deleteList: async (options: DeleteListOptions) => {
    return deleteList(await getDB(), options);
  },

  listLists: async () => {
    return listLists(await getDB());
  },

  getListById: async (options: GetListByIdOptions) => {
    return getListById(await getDB(), options);
  },
};

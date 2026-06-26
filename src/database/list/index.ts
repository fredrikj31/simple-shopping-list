import { getDB } from "../index";
import { createList, CreateListOptions } from "./queries/createList";
import { getLists } from "./queries/getLists";

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

  getLists: async () => {
    return getLists(await getDB());
  },
};

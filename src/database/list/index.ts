import { getDB } from "../index";
import { getLists } from "./queries/getLists";

export const STORE_NAME = "lists";

export interface ListStore {
  key: string;
  value: { id: string; name: string; index: number };
  indexes: { "by-index": number };
}

export const listDatabase = {
  getLists: async () => {
    return getLists(await getDB());
  },
};

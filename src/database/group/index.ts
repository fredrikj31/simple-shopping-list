import { getDB } from "..";
import { listGroups } from "./queries/listGroups";

export const STORE_NAME = "groups" as const;

export interface GroupStore {
  key: string;
  value: { id: string; name: string; index: number };
}

export const groupDatabase = {
  listGroups: async () => {
    return listGroups(await getDB());
  },
};

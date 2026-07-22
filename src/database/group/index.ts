import { getDB } from "..";
import { createGroup, CreateGroupOptions } from "./queries/createGroup";
import { listGroups } from "./queries/listGroups";

export const STORE_NAME = "groups" as const;

export interface GroupStore {
  key: string;
  value: { id: string; name: string; index: number };
}

export const groupDatabase = {
  createGroup: async (options: CreateGroupOptions) => {
    return createGroup(await getDB(), options);
  },

  listGroups: async () => {
    return listGroups(await getDB());
  },
};

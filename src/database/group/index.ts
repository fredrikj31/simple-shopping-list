import { getDB } from "..";
import { createGroup, CreateGroupOptions } from "./queries/createGroup";
import { deleteGroup, DeleteGroupOptions } from "./queries/deleteGroup";
import { getGroup, GetGroupOptions } from "./queries/getGroup";
import { listGroups } from "./queries/listGroups";
import { updateGroup, UpdateGroupOptions } from "./queries/updateGroup";

export const STORE_NAME = "groups" as const;

export interface GroupStore {
  key: string;
  value: { id: string; name: string; index: number };
}

export const groupDatabase = {
  createGroup: async (options: CreateGroupOptions) => {
    return createGroup(await getDB(), options);
  },

  deleteGroup: async (options: DeleteGroupOptions) => {
    return deleteGroup(await getDB(), options);
  },

  updateGroup: async (options: UpdateGroupOptions) => {
    return updateGroup(await getDB(), options);
  },

  listGroups: async () => {
    return listGroups(await getDB());
  },

  getGroup: async (options: GetGroupOptions) => {
    return getGroup(await getDB(), options);
  },
};

export const STORE_NAME = "items" as const;

export interface ItemStore {
  key: string;
  value: { id: string; listId: string; text: string; completed: boolean };
  indexes: { "by-list-id": number };
}

export const itemDatabase = {};

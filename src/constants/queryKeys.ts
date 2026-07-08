export const queryKeys = {
  lists: {
    list: ["lists"] as const,
    getListById: (id: string) => ["lists", id] as const,
  },

  items: {
    getItemsByListId: (listId: string) => ["items", listId] as const,
  },
};

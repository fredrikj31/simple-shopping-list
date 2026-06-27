export const queryKeys = {
  lists: {
    list: ["lists", "list"] as const,
    getListById: (id: string) => ["lists", "get", id] as const,
  },
};

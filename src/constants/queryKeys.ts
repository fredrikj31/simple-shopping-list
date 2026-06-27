export const queryKeys = {
  lists: {
    list: ["lists"] as const,
    getListById: (id: string) => ["lists", id] as const,
  },
};

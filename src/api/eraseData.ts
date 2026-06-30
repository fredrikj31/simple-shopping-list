import { listDatabase } from "../database/list";

export const eraseData = async (): Promise<void> => {
  await listDatabase.truncateLists();
  return;
};

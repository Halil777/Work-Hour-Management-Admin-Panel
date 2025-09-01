import type { Stats } from "../../types/stats";
import { api } from "../client";

export const getStats = async (): Promise<Stats> => {
  const { data } = await api.get<Stats>("/admin/stats");
  return data;
};

import { useQuery } from "@tanstack/react-query";
import { getStats } from "../api/services/statsService";
import type { Stats } from "../types/stats";

export const useStats = () => {
  return useQuery<Stats>({
    queryKey: ["stats"],
    queryFn: getStats,
    staleTime: 1000 * 60 * 2,
  });
};

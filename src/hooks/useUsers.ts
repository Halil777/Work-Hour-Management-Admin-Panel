import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";
import type { User } from "../types/user";

// plain list with caching
export const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get("/admin/users"); // 👈 diňe şu bar bolsa
      return res.data;
    },
    staleTime: 1000 * 60, // 1 minut cache
    gcTime: 1000 * 60 * 5, // 5 minut garbage collect
  });
};

import { useQuery } from "@tanstack/react-query";
import { getUsers, searchUsers } from "../api/services/userService";
import type { PaginatedResponse, User } from "../types/user";

// plain list
export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 1000 * 60 * 5,
  });
};

// search + pagination
export const useSearchUsers = (page: number, limit: number, q: string) => {
  return useQuery<PaginatedResponse<User>>({
    queryKey: ["search-users", page, limit, q],
    queryFn: () => searchUsers(page, limit, q),
    placeholderData: (previous) => previous, // 👈 keepPreviousData ornuna
  });
};

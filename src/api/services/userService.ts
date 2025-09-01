import type { PaginatedResponse, User } from "../../types/user";
import { api } from "../client";

export const getUsers = async (): Promise<User[]> => {
  const { data } = await api.get<User[]>("/admin/users");
  return data;
};

export const searchUsers = async (
  page: number = 1,
  limit: number = 10,
  q: string = ""
): Promise<PaginatedResponse<User>> => {
  const { data } = await api.get<PaginatedResponse<User>>(
    "/admin/search/workers",
    {
      params: { page, limit, q },
    }
  );
  return data;
};

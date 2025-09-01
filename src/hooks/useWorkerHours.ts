// hooks/useWorkerHours.ts
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { api } from "../api/client";

export interface WorkerHour {
  id: number;
  user: {
    id: number;
    name: string;
    position: string;
    telegramId?: string | null;
  };
  date: string;
  hours: number;
  sent: boolean;
}

export interface WorkerHoursResponse {
  success: boolean;
  data: WorkerHour[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const getWorkerHours = async (
  page: number,
  limit: number,
  search?: string
): Promise<WorkerHoursResponse> => {
  const res = await api.get("/admin/worker-hours", {
    params: { page, limit, search },
  });
  return res.data;
};

export const useWorkerHours = (page: number, limit: number, search: string) => {
  return useQuery<WorkerHoursResponse>({
    queryKey: ["worker-hours", page, limit, search],
    queryFn: () => getWorkerHours(page, limit, search),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
};

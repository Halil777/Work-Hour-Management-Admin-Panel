import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { api } from "../api/client";

export interface GlobalSearchResponse {
  workers: {
    items: any[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
  workerHours: {
    items: any[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
  totals: {
    items: any[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
  feedback: {
    items: any[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export const useGlobalSearch = (
  q: string,
  page: number,
  limit: number,
  dateFrom?: string,
  dateTo?: string
) => {
  return useQuery<GlobalSearchResponse>({
    queryKey: ["global-search", q, page, limit, dateFrom, dateTo],
    queryFn: async () => {
      const res = await api.get("/admin/global", {
        params: { q, page, limit, dateFrom, dateTo },
      });
      return res.data;
    },
    enabled: !!q || !!dateFrom || !!dateTo, // diňe search bar bolsa fetch
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
};

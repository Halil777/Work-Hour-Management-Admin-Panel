import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";

export interface Feedback {
  id: number;
  message: string;
  action: "LOGOUT" | "INCORRECT_TIME";
  adminNotified: boolean;
  createdAt: string;
  workerHoursId: number;
  user: {
    id: number;
    name: string;
    position: string;
    telegramId: string;
  };
  workerHours?: {
    id: number;
    date: string;
    hours: number;
  };
}

export const useFeedbacks = () => {
  return useQuery<Feedback[]>({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const res = await api.get("/admin/feedbacks");
      return res.data;
    },
    staleTime: 1000 * 60, // 1 minut cache
  });
};

import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";

export interface Feedback {
  id: number;
  message: string;
  action: "LOGOUT" | "INCORRECT_TIME";
  adminNotified: boolean;
  createdAt: string;
  workerHoursId: number;
  response?: string | null;
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

// Table üçin umumy fetch
export const useFeedbacks = () => {
  return useQuery<Feedback[]>({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const res = await api.get("/admin/feedbacks");
      return res.data;
    },
    staleTime: 60_000, // tablisa üçin 1 minut cache
  });
};

// Badge üçin aýratyn realtime fetch
export const useUnreadFeedbackCount = () => {
  return (
    useQuery<number>({
      queryKey: ["feedbacks", "unreadCount"],
      queryFn: async () => {
        const res = await api.get("/admin/feedbacks");
        const all = res.data as Feedback[];
        return all.filter((f) => !f.adminNotified).length;
      },
      refetchInterval: 5000, // 5 sekuntdan bir fetch et
      staleTime: 0, // hemişe täzeden çek
      refetchOnWindowFocus: true, // admin sahypa gaýdyp gelende täzelensin
    }).data ?? 0
  );
};

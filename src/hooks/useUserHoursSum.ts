import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";

export interface UserHoursSum {
  userId: number;
  name: string;
  position: string;
  totalHours: number;
}

export interface UserHoursSumResponse {
  success: boolean;
  data: UserHoursSum[];
}

export const getUserHoursSum = async (
  startDate: string,
  endDate: string
): Promise<UserHoursSumResponse> => {
  const res = await api.get("/admin/user-hours-sum", {
    params: { startDate, endDate },
  });
  return res.data;
};

export const useUserHoursSum = (startDate: string, endDate: string) => {
  return useQuery<UserHoursSumResponse>({
    queryKey: ["user-hours-sum", startDate, endDate],
    queryFn: () => getUserHoursSum(startDate, endDate),
    enabled: !!startDate && !!endDate, // diňe date bar bolsa fetch et
    staleTime: 1000 * 60 * 5,
  });
};

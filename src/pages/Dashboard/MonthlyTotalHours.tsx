import { Typography, useTheme, Paper } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";

export default function MonthlyTotalHours() {
  const theme = useTheme();

  const { data, isLoading } = useQuery({
    queryKey: ["monthly-total-hours"],
    queryFn: async () => {
      const res = await api.get("/admin/stats/monthly-total");
      return res.data as { month: string; totalHours: number }[];
    },
  });

  const chartData =
    data?.map((d) => ({
      month: dayjs(d.month).format("MMM YYYY"),
      totalHours: d.totalHours,
    })) || [];

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: "14px 4px 14px 4px",
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg,#121212,#1f1f1f)"
            : "linear-gradient(135deg,#fefefe,#f5f8fa)",
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 6px 20px rgba(255,140,0,0.35)"
            : "0 6px 20px rgba(25,118,210,0.25)",
      }}
    >
      <Typography variant="h6" mb={2} fontWeight={700}>
        📈 Monthly Total Hours
      </Typography>

      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="totalHours"
              stroke="#1976d2"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
}

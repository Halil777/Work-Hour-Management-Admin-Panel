import { Typography, useTheme, Paper } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function TopWeeklyWorkers() {
  const theme = useTheme();

  const { data, isLoading } = useQuery({
    queryKey: ["top-weekly-workers"],
    queryFn: async () => {
      const res = await api.get("/admin/stats/top-weekly");
      return res.data as {
        user: { id: number; name: string };
        totalHours: number;
      }[];
    },
  });

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
        🏆 Top 10 (Weekly)
      </Typography>

      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data || []} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis
              dataKey={(d) => d.user?.name || "Unknown"}
              type="category"
              width={120}
            />
            <Tooltip />
            <Bar dataKey="totalHours" fill="#1976d2" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
}

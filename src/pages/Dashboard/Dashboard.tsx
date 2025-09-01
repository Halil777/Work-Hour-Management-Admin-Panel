import { Grid, Typography, Box, Card, Skeleton, useTheme } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { useStats } from "../../hooks/useStats";
import StatsCard from "../../components/common/StatsCard";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import TopWeeklyWorkers from "./TopWeeklyWorkers";
import TopMonthlyWorkers from "./TopMonthlyWorkers";
import MonthlyTotalHours from "./MonthlyTotalHours";

export default function Dashboard() {
  const { data, isLoading } = useStats();
  const theme = useTheme();

  if (isLoading) {
    return (
      <Grid container spacing={3}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Grid size={{ xs: 12, md: 3 }} key={i}>
            <Card sx={{ borderRadius: 3, p: 2 }}>
              <Skeleton variant="rectangular" height={80} />
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  const pieData = [
    { name: "Linked", value: data?.linkedUsers || 0 },
    { name: "Unlinked", value: data?.unlinkedUsers || 0 },
  ];

  const COLORS = ["#4caf50", "#f44336"];

  return (
    <Box>
      <Typography variant="h5" mb={3} fontWeight={700}>
        Dashboard
      </Typography>

      {/* Top Stats */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          <StatsCard
            title="Total Users"
            value={data?.totalUsers}
            icon={<PeopleIcon fontSize="large" />}
            color="#1976d2"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <StatsCard
            title="Linked Users"
            value={data?.linkedUsers}
            icon={<CheckCircleIcon fontSize="large" />}
            color="#4caf50"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <StatsCard
            title="Unlinked Users"
            value={data?.unlinkedUsers}
            icon={<CancelIcon fontSize="large" />}
            color="#f44336"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <StatsCard
            title="Today Feedbacks"
            value={data?.todayFeedbacks}
            icon={<FeedbackIcon fontSize="large" />}
            color="#9c27b0"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TopWeeklyWorkers />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TopMonthlyWorkers />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <MonthlyTotalHours />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} mt={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              p: 3,
              borderRadius: "14px 4px 14px 4px",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg,#121212,#1f1f1f)"
                  : "linear-gradient(135deg,#f8f9fc,#e3f2fd)",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 6px 20px rgba(255,165,0,0.35)"
                  : "0 6px 20px rgba(25,118,210,0.25)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px) scale(1.01)",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 10px 28px rgba(255,140,0,0.55)"
                    : "0 10px 28px rgba(25,118,210,0.4)",
              },
            }}
          >
            <Typography
              variant="h6"
              mb={2}
              sx={{
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Users Linked vs Unlinked
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

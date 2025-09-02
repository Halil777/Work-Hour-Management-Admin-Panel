import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Stack,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/client";
import { useTranslation } from "../../i18n";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { WorkerHour } from "../../hooks/useWorkerHours";

interface Props {
  open: boolean;
  onClose: () => void;
  worker: WorkerHour["user"] | null;
}

interface WorkerStats {
  totalHours: number;
  monthly: { month: string; hours: number }[];
}

// Fetch worker stats API
const fetchWorkerStats = async (userId: number): Promise<WorkerStats> => {
  const res = await api.get("/admin/user-hours-sum", {
    params: { startDate: "2025-01-01", endDate: "2025-12-31", userId },
  });
  return res.data;
};

export default function WorkerDetailsDrawer({ open, onClose, worker }: Props) {
  const theme = useTheme();
  const { t } = useTranslation();

  const { data, isLoading } = useQuery({
    queryKey: ["worker-stats", worker?.id],
    queryFn: () => fetchWorkerStats(worker!.id),
    enabled: !!worker?.id, // diňe user saýlananda fetch etsin
    staleTime: 1000 * 60 * 5, // 5 minut cache
  });

  return (
    <Drawer anchor="right" open={open} onClose={onClose} sx={{ zIndex: 1300 }}>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          bgcolor:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg,#121212,#1f1f1f)"
              : "linear-gradient(135deg,#fefefe,#f5f8fa)",
          p: 3,
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5" fontWeight={700}>
            {t("workerProfileTitle")}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider sx={{ my: 2 }} />

        {/* User Info */}
        {worker && (
          <Card
            sx={{
              mb: 3,
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 4px 15px rgba(255,140,0,0.3)"
                  : "0 4px 15px rgba(25,118,210,0.25)",
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight={700}>
                {worker.name}
              </Typography>
              <Typography color="text.secondary">
                💼 {worker.position}
              </Typography>
              <Typography color="text.secondary">
                📱 Telegram: {worker.telegramId ?? "-"}
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* Stats */}
        {isLoading ? (
          <Typography>{t("loading")}</Typography>
        ) : (
          data && (
            <>
              {/* Total Stats */}
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700}>
                    {t("workerStatsTitle")}
                  </Typography>
                  <Typography mt={1}>
                    {t("workerStatsTotalHours")} {" "}
                    <b style={{ color: theme.palette.success.main }}>
                      {data.totalHours}
                    </b>
                  </Typography>
                </CardContent>
              </Card>

              {/* Monthly Stats */}
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {t("workerStatsMonthlyTitle")}
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.monthly}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar
                          dataKey="hours"
                          fill={theme.palette.primary.main}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </>
          )
        )}
      </Box>
    </Drawer>
  );
}

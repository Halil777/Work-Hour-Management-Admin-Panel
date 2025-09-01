import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Skeleton,
  useTheme,
  Box,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-hot-toast";
import type { WorkerHour } from "../../hooks/useWorkerHours";
import WorkerDetailsDrawer from "./WorkerDetailsDrawer";
import { useTranslation } from "../../i18n";

interface Props {
  data: WorkerHour[];
  isLoading: boolean;
  isFetching: boolean;
}

export default function WorkerHoursTable({
  data,
  isLoading,
  isFetching,
}: Props) {
  const theme = useTheme();
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedWorker, setSelectedWorker] = useState<
    WorkerHour["user"] | null
  >(null);
  const { t } = useTranslation();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    toast.success(`${t("copied")}: ${text}`, { duration: 2000 });

    // reset after 2 sec
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow
            sx={{
              background:
                theme.palette.mode === "dark"
                  ? "#1f1f1f"
                  : "rgba(25,118,210,0.08)",
              "& th": {
                borderRight: `1px solid ${
                  theme.palette.mode === "dark" ? "#333" : "#ddd"
                }`,
                whiteSpace: "nowrap",
              },
            }}
          >
            {[t("workerHoursUser"), t("workerHoursPosition"), t("usersTelegram"), t("workerHoursDate"), t("workerHoursHours")].map((head) => (
              <TableCell
                key={head}
                sx={{
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  fontSize: "0.75rem",
                }}
              >
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {isLoading
            ? [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={6}>
                    <Skeleton height={30} />
                  </TableCell>
                </TableRow>
              ))
            : data.map((wh) => (
                <TableRow
                  onClick={() => setSelectedWorker(wh.user)}
                  key={wh.id}
                  hover
                  sx={{
                    "&:hover": {
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(255,140,0,0.08)"
                          : "rgba(25,118,210,0.05)",
                      transition: "all 0.2s ease",
                    },
                    "& td": {
                      borderRight: `1px solid ${
                        theme.palette.mode === "dark" ? "#333" : "#ddd"
                      }`,
                    },
                  }}
                >
                  {/* User */}
                  <TableCell
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleCopy(wh.user.name)}
                  >
                    {wh.user.name}
                    {copied === wh.user.name && (
                      <span style={{ marginLeft: 6, color: "green" }}>✓</span>
                    )}
                  </TableCell>

                  {/* Position */}
                  <TableCell>{wh.user.position}</TableCell>

                  {/* Telegram */}
                  <TableCell
                    sx={{
                      cursor: wh.user.telegramId ? "pointer" : "default",
                    }}
                    onClick={() =>
                      wh.user.telegramId && handleCopy(wh.user.telegramId)
                    }
                  >
                    {wh.user.telegramId ?? "-"}
                    {copied === wh.user.telegramId && (
                      <span style={{ marginLeft: 6, color: "green" }}>✓</span>
                    )}
                  </TableCell>

                  {/* Date */}
                  <TableCell>
                    {new Date(wh.date).toLocaleDateString("ru-RU")}
                  </TableCell>

                  {/* Hours */}
                  <TableCell>{wh.hours}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>

      {isFetching && (
        <Box textAlign="center" py={2}>
          <CircularProgress size={20} />
        </Box>
      )}

      <WorkerDetailsDrawer
        open={!!selectedWorker}
        onClose={() => setSelectedWorker(null)}
        worker={selectedWorker}
      />
    </>
  );
}

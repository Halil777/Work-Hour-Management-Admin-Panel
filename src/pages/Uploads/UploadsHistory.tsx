import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Skeleton,
  useTheme,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { api } from "../../api/client";
import { useTranslation, localeMap } from "../../i18n";

interface UploadRecord {
  id: number;
  filename: string;
  originalName: string;
  recordsCount: number;
  uploadDate: string;
  createdAt: string;
  processed: boolean;
}

const fetchUploads = async (): Promise<UploadRecord[]> => {
  const res = await api.get("/admin/uploads");
  return res.data;
};

export default function UploadsHistory() {
  const theme = useTheme();
  const [selectedMonth, setSelectedMonth] = useState<Dayjs | null>(null);
  const { t, lang } = useTranslation();

  const { data, isLoading } = useQuery({
    queryKey: ["uploads-history"],
    queryFn: fetchUploads,
    refetchInterval: 30_000,
  });

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (!selectedMonth) return data;

    return data.filter((u) => {
      const fileDate = dayjs(u.uploadDate);
      return (
        fileDate.year() === selectedMonth.year() &&
        fileDate.month() === selectedMonth.month()
      );
    });
  }, [data, selectedMonth]);

  return (
    <Box mt={5}>
      <Typography
        variant="h6"
        fontWeight={700}
        mb={2}
        sx={{ textTransform: "uppercase", letterSpacing: 1 }}
      >
        {t("uploadsHistoryTitle")}
      </Typography>

      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <DatePicker
          views={["year", "month"]}
          label={t("filterByMonth")}
          value={selectedMonth}
          onChange={(newValue) => setSelectedMonth(newValue)}
        />
        <Button variant="text" onClick={() => setSelectedMonth(null)}>
          {t("reset")}
        </Button>
      </Box>

      <Paper
        sx={{
          overflow: "hidden",
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
                  fontWeight: 700,
                  textTransform: "uppercase",
                  fontSize: "0.75rem",
                },
              }}
            >
              <TableCell>{t("uploadsFile")}</TableCell>
              <TableCell>{t("uploadsUploadDate")}</TableCell>
              <TableCell>{t("uploadsAccountingDate")}</TableCell>
              <TableCell>{t("uploadsRecords")}</TableCell>
              <TableCell>{t("uploadsStatus")}</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={5}>
                    <Skeleton height={30} />
                  </TableCell>
                </TableRow>
              ))
            ) : filteredData && filteredData.length > 0 ? (
              filteredData.map((u) => (
                <TableRow key={u.id} hover>
                  <TableCell>{u.originalName}</TableCell>
                  <TableCell>
                    {new Date(u.createdAt).toLocaleString(localeMap[lang])}
                  </TableCell>
                  <TableCell>
                    {new Date(u.uploadDate).toLocaleDateString(localeMap[lang])}
                  </TableCell>
                  <TableCell>{u.recordsCount}</TableCell>
                  <TableCell>
                    {u.processed
                      ? t("uploadsProcessed")
                      : t("uploadsProcessing")}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  {t("uploadsNone")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

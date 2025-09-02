import { Box, Typography, Paper, useTheme, Stack } from "@mui/material";
import { useState } from "react";
import { useWorkerHours } from "../../hooks/useWorkerHours";
import WorkerHoursTable from "./WorkerHoursTable";
import CountUp from "react-countup";
// import SearchInput from "../../components/common/SearchInput";
import TablePagination from "@mui/material/TablePagination";
import { useTranslation } from "../../i18n";

export default function WorkerHoursPage() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const { data, isLoading, isFetching } = useWorkerHours(
    page + 1,
    limit,
    search
  );
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box>
      <Typography
        variant="h5"
        mb={1}
        fontWeight={700}
        sx={{ textTransform: "uppercase", letterSpacing: 1 }}
      >
        {t("workerHoursTitle")}
      </Typography>

      <Stack direction="row" my={3} spacing={2} alignItems="center">
        {/* <SearchInput
          value={search}
          onChange={(val) => {
            setSearch(val);
            setPage(0); // täze gözlegde page reset
          }}
        /> */}
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            color:
              theme.palette.mode === "dark"
                ? theme.palette.warning.light
                : theme.palette.primary.main,
          }}
        >
          <CountUp end={data?.pagination.total || 0} duration={2} />{" "}
          {t("workerHoursRecords", { count: data?.pagination.total || 0 })}
        </Typography>
      </Stack>

      <Paper
        sx={{
          borderRadius: "14px 4px 14px 4px",
          overflow: "hidden",
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
        <WorkerHoursTable
          data={data?.data || []}
          isLoading={isLoading}
          isFetching={isFetching}
        />
        <TablePagination
          component="div"
          count={data?.pagination.total || 0}
          page={page}
          rowsPerPage={limit}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setLimit(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>
    </Box>
  );
}

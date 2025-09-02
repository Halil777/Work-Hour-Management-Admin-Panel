import { useState, useRef } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  IconButton,
  TextField,
  useTheme,
  LinearProgress,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import { toast } from "react-hot-toast";
import { api } from "../../api/client"; // axios instance
import axios, { type CancelTokenSource } from "axios";
import UploadsHistory from "./UploadsHistory";
import UploadAnimation from "./UploadAnimation";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTranslation } from "../../i18n";

interface FilePreview {
  file: File;
  url: string;
}

export default function ExcelUpload() {
  const theme = useTheme();
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [targetDate, setTargetDate] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const cancelSource = useRef<CancelTokenSource | null>(null);
  const { t, lang } = useTranslation();

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
      toast.error(t("uploadsOnlyExcel"));
      return;
    }

    const mapped = {
      file,
      url: URL.createObjectURL(file),
    };
    setFiles([mapped]);
    toast.success(t("uploadsSelectFile", { file: file.name }));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
  });

  const handleRemove = () => {
    setFiles([]);
    setProgress(0);
    setUploading(false);
    setTimeLeft("");
    toast(t("uploadsRemoveFile"), { icon: "🗑" });
  };

  const handleCancel = () => {
    if (cancelSource.current) {
      cancelSource.current.cancel("admin cancelled");
      setUploading(false);
      setProgress(0);
      setTimeLeft("");
      toast(t("uploadsCancel"));
    }
  };

  const handleUpload = async () => {
    if (!files[0] || !targetDate) {
      toast.error(t("uploadsNoFileOrDate"));
      return;
    }

    const formData = new FormData();
    formData.append("excel", files[0].file);
    formData.append("targetDate", targetDate);

    try {
      setUploading(true);
      setProgress(0);
      setTimeLeft("");

      cancelSource.current = axios.CancelToken.source();
      const startTime = Date.now();

      await axios.post("/admin/upload-excel", formData, {
        baseURL: api.defaults.baseURL,
        headers: { "Content-Type": "multipart/form-data" },
        cancelToken: cancelSource.current.token,
        onUploadProgress: (progressEvent) => {
          if (!progressEvent.total) return;

          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percent);

          // MB maglumat
          const uploadedMB = (progressEvent.loaded / (1024 * 1024)).toFixed(2);
          const totalMB = (progressEvent.total / (1024 * 1024)).toFixed(2);

          // ETA
          const elapsed = (Date.now() - startTime) / 1000; // sec
          const speed = progressEvent.loaded / elapsed; // bytes/sec
          const remaining = progressEvent.total - progressEvent.loaded;
          const eta = remaining / speed;

          if (eta > 1) {
            setTimeLeft(
              t("uploadsProgress", {
                uploaded: uploadedMB,
                total: totalMB,
                seconds: Math.ceil(eta),
              })
            );
          } else {
            setTimeLeft(
              t("uploadsProgressFinishing", {
                uploaded: uploadedMB,
                total: totalMB,
              })
            );
          }
        },
      });

      const totalTime = (Date.now() - startTime) / 1000; // sec
      setFiles([]);
      setTargetDate("");

      // Notification
      if (totalTime > 20) {
        toast.success(
          t("uploadsSuccessSlow", { seconds: Math.ceil(totalTime) })
        );
      } else {
        toast.success(
          t("uploadsSuccess", { seconds: Math.ceil(totalTime) })
        );
      }
    } catch (error: unknown) {
      if (axios.isCancel(error)) {
        toast(t("uploadsCancel"));
      } else {
        const err = error as { response?: { data?: { error?: string } } };
        toast.error(err?.response?.data?.error || "Error");
      }
    } finally {
      setUploading(false);
      setProgress(0);
      setTimeLeft("");
    }
  };

  return (
    <>
      <Box>
        {/* Date picker */}
        <TextField
          label={t("uploadsDateLabel")}
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          sx={{ mb: 3 }}
        />

        {/* Upload Zone */}
        <Paper
          {...getRootProps()}
          sx={{
            p: 4,
            textAlign: "center",
            border: "2px dashed",
            borderColor: isDragActive
              ? theme.palette.primary.main
              : theme.palette.divider,
            bgcolor: theme.palette.mode === "dark" ? "#1f1f1f" : "#fafafa",
            cursor: "pointer",
            transition: "all 0.3s",
            "&:hover": {
              borderColor: theme.palette.primary.main,
              bgcolor:
                theme.palette.mode === "dark"
                  ? "rgba(25,118,210,0.08)"
                  : "rgba(25,118,210,0.05)",
            },
          }}
        >
          <input {...getInputProps()} />
          <CloudUploadIcon
            fontSize="large"
            sx={{
              color: uploading
                ? theme.palette.success.main
                : theme.palette.primary.main,
            }}
          />
          <Typography variant="h6" mt={1}>
            {isDragActive
              ? t("uploadsDrop")
              : t("uploadsDrag")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("uploadsSupport")}
          </Typography>
        </Paper>

        {/* Preview */}
        {files.length > 0 && (
          <Stack spacing={2} mt={3}>
            {files.map((f, i) => (
              <Paper
                key={i}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 2,
                    bgcolor: theme.palette.primary.light,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 2,
                    fontSize: 24,
                  }}
                >
                  📊
                </Box>
                <Box flexGrow={1}>
                  <Typography fontWeight={600}>{f.file.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {(f.file.size / 1024).toFixed(1)} KB
                  </Typography>
                </Box>
                <IconButton onClick={handleRemove} color="error">
                  <DeleteIcon />
                </IconButton>
              </Paper>
            ))}
          </Stack>
        )}

        {/* Upload Progress */}
        {uploading && (
          <Box mt={3}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <UploadAnimation />

              <Box flexGrow={1}>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    "& .MuiLinearProgress-bar": { transition: "all 0.3s ease" },
                  }}
                />
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  mt={1}
                  alignItems="center"
                >
                  <Typography variant="body2" color="text.secondary">
                    {progress}% {timeLeft}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "success.main", fontWeight: 600 }}
                  >
                    {progress === 100 ? t("uploadsUploading") : t("uploadsUploading")}
                  </Typography>
                </Stack>
              </Box>

              <IconButton color="error" onClick={handleCancel}>
                <CancelIcon />
              </IconButton>
            </Stack>
          </Box>
        )}

        {/* Upload button */}
        {files.length > 0 && (
          <Button
            sx={{ mt: 3 }}
            variant="contained"
            color="primary"
            fullWidth
            disabled={!targetDate || uploading}
            onClick={handleUpload}
          >
            {uploading ? t("uploadsUploading") : t("uploadsUpload")}
          </Button>
        )}
      </Box>

      {/* Uploads history */}
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={lang}>
        <UploadsHistory />
      </LocalizationProvider>
    </>
  );
}

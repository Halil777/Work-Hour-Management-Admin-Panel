import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Button } from "@mui/material";
import { useTranslation } from "../../i18n";

interface Props {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
}

export default function FilterFeedback({ selectedDate, onChange }: Props) {
  const { t } = useTranslation();
  return (
    <Box display="flex" gap={2} mb={2}>
      <DatePicker
        label={t("filterByDate")}
        value={selectedDate}
        onChange={(newValue) => onChange(newValue ? new Date(newValue) : null)}
      />
      <Button onClick={() => onChange(null)}>{t("reset")}</Button>
    </Box>
  );
}

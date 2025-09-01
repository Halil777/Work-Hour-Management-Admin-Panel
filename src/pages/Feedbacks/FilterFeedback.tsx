import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Button } from "@mui/material";

interface Props {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
}

export default function FilterFeedback({ selectedDate, onChange }: Props) {
  return (
    <Box display="flex" gap={2} mb={2}>
      <DatePicker
        label="Фильтр по дате"
        value={selectedDate}
        onChange={(newValue) => onChange(newValue ? new Date(newValue) : null)}
      />
      <Button onClick={() => onChange(null)}>Сбросить</Button>
    </Box>
  );
}

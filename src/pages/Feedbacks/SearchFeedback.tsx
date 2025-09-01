import { TextField } from "@mui/material";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchFeedback({ value, onChange }: Props) {
  return (
    <TextField
      label="Поиск по имени"
      variant="outlined"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
    />
  );
}

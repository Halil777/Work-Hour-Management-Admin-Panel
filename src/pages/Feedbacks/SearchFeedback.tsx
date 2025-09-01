import { TextField } from "@mui/material";
import { useTranslation } from "../../i18n";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchFeedback({ value, onChange }: Props) {
  const { t } = useTranslation();
  return (
    <TextField
      label={t("searchByName")}
      variant="outlined"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
    />
  );
}

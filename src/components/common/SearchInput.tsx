import { TextField, InputAdornment, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchInput({ value, onChange }: Props) {
  const theme = useTheme();

  return (
    <TextField
      size="small"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search users..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
      }}
      sx={{
        width: 300,
        bgcolor: theme.palette.background.paper,
        borderRadius: 2,
      }}
    />
  );
}

import { Select, MenuItem } from '@mui/material';
import { useTranslation } from '../../i18n';

export default function LanguageSwitcher() {
  const { lang, setLang } = useTranslation();
  return (
    <Select
      value={lang}
      onChange={(e) => setLang(e.target.value as any)}
      size="small"
      sx={{ mr: 2, color: 'inherit', borderColor: 'inherit' }}
    >
      <MenuItem value="ru">RU</MenuItem>
      <MenuItem value="en">EN</MenuItem>
      <MenuItem value="tr">TR</MenuItem>
    </Select>
  );
}

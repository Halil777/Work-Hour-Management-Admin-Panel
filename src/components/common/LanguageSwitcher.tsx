import { Select, MenuItem } from '@mui/material';
import { useTranslation, type Lang } from '../../i18n';

export default function LanguageSwitcher() {
  const { lang, setLang } = useTranslation();
  return (
    <Select
      value={lang}
      onChange={(e) => setLang(e.target.value as Lang)}
      size="small"
      sx={{ mr: 2, color: 'inherit', borderColor: 'inherit' }}
    >
      <MenuItem value="ru">RU</MenuItem>
      <MenuItem value="en">EN</MenuItem>
      <MenuItem value="tr">TR</MenuItem>
      <MenuItem value="tm">TM</MenuItem>
    </Select>
  );
}

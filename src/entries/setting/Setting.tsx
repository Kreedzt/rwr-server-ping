import { createEffect, createSignal, useContext } from 'solid-js';
import {
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@suid/material';
import { HomeContext } from '../../contexts/home';
import toast from 'solid-toast';
import { useI18n } from '@solid-primitives/i18n';
import { useTranslate } from '../../hooks/useTranslate';

function Setting() {
  const t = useTranslate();
  const [_t, { locale }] = useI18n();
  const homeContext = useContext(HomeContext);

  const onReset = async () => {
    try {
      await homeContext?.configStore.reset();
      toast.success('重置成功');
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <div>
      <Button color="error" variant="contained" onClick={onReset}>
        {t('config_reset')}
      </Button>
      <Box p={2}>
        <FormControl fullWidth>
          <InputLabel>{t('language')}</InputLabel>
          <Select
            value={locale()}
            onChange={(e) => {
              locale(e.target.value);
              homeContext?.configStore.updateLocale(e.target.value);
            }}
            label={t('language')}
          >
            <MenuItem value="zh_CN">{t('language_zh')}</MenuItem>
            <MenuItem value="en_US">{t('language_en')}</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}

export default Setting;

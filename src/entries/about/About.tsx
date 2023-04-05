import { Box, Button, Divider, Link, Typography } from '@suid/material';
import { getName, getVersion } from '@tauri-apps/api/app';
import { open } from '@tauri-apps/api/shell';
import { AUTHORS, SOURCE_CODE_URL } from '../../constants';
import { createEffect, createSignal } from 'solid-js';
import { useTranslate } from '../../hooks/useTranslate';

function About() {
  const t = useTranslate();
  const [appInfo, setAppInfo] = createSignal<{
    name: string;
    version: string;
  }>();

  async function refreshAppInfo() {
    try {
      const [name, version] = await Promise.all([getName(), getVersion()]);

      setAppInfo({
        name,
        version,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async function openSourceUrl() {
    try {
      await open(SOURCE_CODE_URL);
    } catch (e) {
      console.error(e);
    }
  }

  createEffect(() => {
    refreshAppInfo();
  });

  return (
    <Box>
      <Box p={2}>
        <Typography variant="h5">{t('app_full_name')}</Typography>
      </Box>

      <Divider />

      <Box p={2}>
        <Typography variant="subtitle1">
          {t('app_name')}: {appInfo()?.name}
        </Typography>
        <Typography variant="subtitle1">
          {t('app_version')}: {appInfo()?.version}
        </Typography>
        <Typography variant="subtitle1">
          {t('app_source_code')}:
          <Button variant="text" onClick={openSourceUrl}>
            rwr-server-ping
          </Button>
        </Typography>
        <Typography variant="subtitle1">
          {t('app_authors')}: {AUTHORS.join(',')}
        </Typography>
      </Box>

      <Divider />
    </Box>
  );
}

export default About;

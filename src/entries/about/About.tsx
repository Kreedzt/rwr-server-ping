import { Box, Button, Divider, Link, Typography } from '@suid/material';
import { getName, getVersion } from '@tauri-apps/api/app';
import { open } from '@tauri-apps/api/shell';
import { AUTHORS, SOURCE_CODE_URL } from '../../constants';
import { createEffect, createSignal } from 'solid-js';

function About() {
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
        <Typography variant="h5">RWR 服务器状态检测</Typography>
      </Box>

      <Divider />

      <Box p={2}>
        <Typography variant="subtitle1">应用名称: {appInfo()?.name}</Typography>
        <Typography variant="subtitle1">
          应用版本: {appInfo()?.version}
        </Typography>
        <Typography variant="subtitle1">
          源码地址:
          <Button variant="text" onClick={openSourceUrl}>
            rwr-server-ping
          </Button>
        </Typography>
        <Typography variant="subtitle1">作者: {AUTHORS.join(',')}</Typography>
      </Box>

      <Divider />
    </Box>
  );
}

export default About;

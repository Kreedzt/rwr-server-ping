import { Link, Outlet, Route, Routes, useLocation } from '@solidjs/router';
import {
  Box,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@suid/material';
import { MENU_LIST } from '../../routes';
import { createEffect, createSignal, mapArray, Show } from 'solid-js';
import { Toaster } from 'solid-toast';
import { HomeContext, IHomeContextValue } from '../../contexts/home';
import { StoreModel } from '../../model/store';
import { useTranslate } from '../../hooks/useTranslate';
import { useI18n } from '@solid-primitives/i18n';

function Home() {
  const location = useLocation();
  const [initLoading, setInitLoading] = createSignal(false);
  const [_t, { locale }] = useI18n();
  const t = useTranslate();

  const contextValue: IHomeContextValue = {
    configStore: new StoreModel(),
  };

  createEffect(() => {
    setInitLoading(true);
    contextValue.configStore.init().then((newConfig) => {
      locale(newConfig.locale);
    });
    setInitLoading(false);
  });

  return (
    <HomeContext.Provider value={contextValue}>
      <Show when={!initLoading()} fallback={<CircularProgress />}>
        <div class="w-full h-full overflow-auto flex">
          <div class="w-64 overflow-auto flex relative pr-2">
            <List class="flex-1 pr-2">
              {mapArray(
                () => MENU_LIST,
                (m) => (
                  <ListItem disablePadding>
                    <Link href={m.link} class="w-full">
                      <ListItemButton selected={location.pathname === m.link}>
                        <ListItemIcon>{m.icon}</ListItemIcon>
                        <ListItemText primary={t(m.title as any)} />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                )
              )}
            </List>
            <Divider class="absolute right-0 p-1" orientation="vertical" />
          </div>
          <div class="flex-1 overflow-auto ml-2 p-2">
            <Outlet />
          </div>
          <Toaster />
        </div>
      </Show>
    </HomeContext.Provider>
  );
}

export default Home;

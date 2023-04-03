import { Link, Outlet, Route, Routes, useLocation } from '@solidjs/router';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@suid/material';
import { MENU_LIST } from '../../routes';
import { mapArray } from 'solid-js';
import { Toaster } from 'solid-toast';

function Home() {
  const location = useLocation();
  return (
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
                    <ListItemText primary={m.title} />
                  </ListItemButton>
                </Link>
              </ListItem>
            )
          )}
        </List>
        <Divider class="absolute right-0 p-1" orientation="vertical" />
      </div>
      <div class="flex-1 overflow-auto ml-2">
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
}

export default Home;

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
import InboxIcon from '@suid/icons-material/Inbox';
import { HOME_MENU, MENU_LIST } from '../../routes';
import { mapArray } from 'solid-js';

function Home() {
  const location = useLocation();

  console.log('location', location);

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
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
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
    </div>
  );
}

export default Home;

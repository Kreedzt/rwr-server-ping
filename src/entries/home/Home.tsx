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

function Home() {
  const location = useLocation();

  console.log('location', location);

  return (
    <div class="w-full h-full overflow-auto flex">
      <div class="w-1/4 overflow-auto flex relative">
        <List class="flex-1">
          {MENU_LIST.map((m) => (
            <ListItem disablePadding>
              <Link href={m.link} class="w-full">
                <ListItemButton autoFocus={location.pathname === m.link}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={m.title} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider class="absolute right-0 p-2" orientation="vertical" />
      </div>
      <div class="w-3/4 overflow-auto ml-2">
        <Outlet />
      </div>
    </div>
  );
}

export default Home;

import { Link, Route, Routes, useLocation } from '@solidjs/router';
import {
  Box,
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
    <div class="w-full h-full overflow-auto">
      <Box>
        <List>
          {[HOME_MENU, ...MENU_LIST].map((m) => (
            <ListItem disablePadding>
              <Link href={m.link}>
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
      </Box>
      <Routes>
        {MENU_LIST.map((m) => (
          <Route path={m.link} component={m.component} />
        ))}
      </Routes>
    </div>
  );
}

export default Home;

import MoreVertIcon from '@suid/icons-material/MoreVert';
import { Menu, MenuItem, IconButton } from '@suid/material';
import { createSignal } from 'solid-js';
import { IServerActionDefine } from './types';
import { DisplayServerItem } from '../../share/types';

const ITEM_HEIGHT = 48;

interface ActionListProps {
  actions: IServerActionDefine[];
  data: DisplayServerItem;
}

function ActionList(props: ActionListProps) {
  const { actions, data } = props;
  const [anchorEl, setAnchorEl] = createSignal<null | HTMLElement>(null);
  const open = () => !!anchorEl();
  const onClose = () => setAnchorEl(null);

  const onMenuChange = (...arg: any[]) => {
    console.log('onMenuChange', arg);
  };

  const onMenuClick = (...arg: any[]) => {
    console.log('onMenuClick', arg);
  };

  const onOptionClick = (...arg: any[]) => {
    console.log('onOptionClick', arg);
    onClose();
  };

  return (
    <>
      <IconButton
        id="long-button"
        aria-label="more"
        aria-controls={open() ? 'long-menu' : undefined}
        aria-expaned={open() ? 'true' : undefined}
        aria-haspopup="true"
        onClick={(ev) => setAnchorEl(ev.currentTarget)}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl()}
        open={open()}
        onClose={onClose}
        onChange={onMenuChange}
        onClick={onMenuClick}
        PaperProps={{
          sx: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {actions.map((option) => (
          <MenuItem onClick={() => option.onClick?.(data)}>
            {option.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default ActionList;

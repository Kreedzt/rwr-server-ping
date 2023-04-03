import { Box, Button, Modal, Typography } from '@suid/material';
import { Accessor, Show } from 'solid-js';
import { clipboard, shell } from '@tauri-apps/api';
import { DisplayServerItem } from '../../share/types';
import ModalContent from '../ModalContent/ModalContent';
import { getMapNameByFullId, getServerJoinCmd } from '../../share/utils';

interface DetailActionProps {
  open: Accessor<boolean>;
  onClose: () => void;
  data: Accessor<DisplayServerItem | undefined>;
}

function DetailAction(props: DetailActionProps) {
  const { open, onClose, data } = props;

  const onJoinGame = async () => {
    try {
      console.log('joinCmd:', getServerJoinCmd(data()!));
      await shell.open(getServerJoinCmd(data()!));
    } catch (e) {
      console.error(e);
    }
  };

  const onCopyJoinCmd = async () => {
    try {
      console.log('joinCmd:', getServerJoinCmd(data()!));
      await clipboard.writeText(getServerJoinCmd(data()!));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal open={open()} onClose={onClose}>
      <ModalContent>
        <Show
          when={!!data()}
          fallback={<Typography variant="h1">暂无内容</Typography>}
        >
          <Typography variant="h5">名称：{data()!.name}</Typography>
          <Typography variant="h5">描述：{data()!.comment}</Typography>
          <Typography variant="h5">IP：{data()!.ipAddress}</Typography>
          <Typography variant="h5">端口：{data()!.port}</Typography>
          <Typography variant="h5">地区：{data()!.country}</Typography>
          <Typography variant="h5">游戏版本：{data()!.version}</Typography>
          <Typography variant="h5">
            地图：{getMapNameByFullId(data()!.mapId)}
          </Typography>
          <Typography variant="h5">
            玩家负载：
            {data()!.currentPlayers} / {data()!.maxPlayers}
          </Typography>

          <div class="flex">
            <Button variant="contained" onClick={onJoinGame}>
              加入游戏
            </Button>
            <div class="ml-2">
              <Button
                onClick={onCopyJoinCmd}
                variant="contained"
                color="warning"
              >
                复制 steam 游戏启动连接
              </Button>
            </div>
          </div>
        </Show>
      </ModalContent>
    </Modal>
  );
}

export default DetailAction;

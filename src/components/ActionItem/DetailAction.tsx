import { Box, Button, Modal, Typography } from '@suid/material';
import { Accessor, Show } from 'solid-js';
import { clipboard, shell } from '@tauri-apps/api';
import { toast } from 'solid-toast';
import { DisplayServerItem } from '../../share/types';
import ModalContent from '../ModalContent/ModalContent';
import { getMapNameByFullId, getServerJoinCmd } from '../../share/utils';
import { useTranslate } from '../../hooks/useTranslate';

interface DetailActionProps {
  open: Accessor<boolean>;
  onClose: () => void;
  data: Accessor<DisplayServerItem | undefined>;
}

function DetailAction(props: DetailActionProps) {
  const { open, onClose, data } = props;
  const t = useTranslate();

  const onJoinGame = async () => {
    try {
      console.log('joinCmd:', getServerJoinCmd(data()!));
      await shell.open(getServerJoinCmd(data()!));
      toast.success(t('message_join_game'), {
        position: 'top-right',
      });
    } catch (e) {
      console.error(e);
    }
  };

  const onCopyJoinCmd = async () => {
    try {
      console.log('joinCmd:', getServerJoinCmd(data()!));
      await clipboard.writeText(getServerJoinCmd(data()!));
      toast.success(t('message_copy'), {
        position: 'top-right',
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal open={open()} onClose={onClose}>
      <ModalContent>
        <Show
          when={!!data()}
          fallback={<Typography variant="h1">{t('empty')}</Typography>}
        >
          <Typography variant="h6">{t('column_server_name')}：</Typography>
          <Typography variant="subtitle1">{data()!.name}</Typography>

          <Typography variant="h6">{t('column_desc')}：</Typography>
          <Typography variant="subtitle1">{data()!.comment}</Typography>

          <Typography variant="h6">{t('column_ip')}：</Typography>
          <Typography variant="subtitle1">{data()!.ipAddress}</Typography>

          <Typography variant="h6">{t('column_port')}：</Typography>
          <Typography variant="subtitle1">{data()!.port}</Typography>

          <Typography variant="h6">{t('column_country')}：</Typography>
          <Typography variant="subtitle1">{data()!.country}</Typography>

          <Typography variant="h6">{t('column_game_version')}：</Typography>
          <Typography variant="subtitle1">{data()!.version}</Typography>

          <Typography variant="h6">{t('column_map')}：</Typography>
          <Typography variant="subtitle1">
            {getMapNameByFullId(data()!.mapId)}
          </Typography>

          <Typography variant="h6">{t('column_player_load')}：</Typography>
          <Typography variant="subtitle1">
            {data()!.currentPlayers} / {data()!.maxPlayers}
          </Typography>

          <div class="flex">
            <Button variant="contained" onClick={onJoinGame}>
              {t('action_join_game')}
            </Button>
            <div class="ml-2">
              <Button
                onClick={onCopyJoinCmd}
                variant="contained"
                color="warning"
              >
                {t('action_copy_join_cmd')}
              </Button>
            </div>
          </div>
        </Show>
      </ModalContent>
    </Modal>
  );
}

export default DetailAction;

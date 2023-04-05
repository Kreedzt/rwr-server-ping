import { Show, useContext } from 'solid-js';
import { Button, LinearProgress } from '@suid/material';
import { useServerList } from '../../components/ServerList/useServerList';
import ServerList from '../../components/ServerList/ServerList';
import { useDetailAction } from '../../components/ActionItem/useDetailAction';
import { IServerActionDefine } from '../../components/ServerList/types';
import { DisplayServerItem } from '../../share/types';
import { HomeContext } from '../../contexts/home';
import { toast } from 'solid-toast';
import DetailAction from '../../components/ActionItem/DetailAction';
import { useTranslate } from '../../hooks/useTranslate';

function InvasionList() {
  const homeContext = useContext(HomeContext);
  const t = useTranslate();

  const {
    loading,
    refreshList,
    pingLoading,
    pingListLoading,
    serverList,
    pingResult,
    pingSingle,
    pingList,
  } = useServerList({
    autoRefresh: true,
    filter: (s) => {
      return s.realm === 'official_invasion';
    },
  });

  const { show, ...elProps } = useDetailAction();
  const actions: IServerActionDefine[] = [
    {
      title: t('action_detail'),
      onClick: show,
    },
    {
      title: t('action_add_to_favorite'),
      onClick: async (s: DisplayServerItem) => {
        try {
          await homeContext?.configStore.addFavorite(s);
          toast.success(t('message_add_success'));
        } catch (e: any) {
          toast.error(e.message);
        }
      },
    },
  ];

  return (
    <div class="flex h-full flex-col">
      <Show when={loading()}>
        <div class="mb-2">
          <LinearProgress />
        </div>
      </Show>
      <div class="flex">
        <Button variant="contained" onClick={refreshList} disabled={loading()}>
          {t('refresh_server_list')}
        </Button>
        <div class="ml-2">
          <Button
            variant="contained"
            color="warning"
            onClick={pingList}
            disabled={pingListLoading()}
          >
            {t('quick_ping')}
          </Button>
        </div>
      </div>
      <ServerList
        containerClass="flex-1"
        data={serverList}
        latencyRecord={pingResult}
        pingLoading={pingLoading}
        onPing={pingSingle}
        actions={actions}
      />

      <DetailAction {...elProps} />
    </div>
  );
}

export default InvasionList;

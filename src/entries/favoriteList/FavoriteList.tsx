import { Show, useContext } from 'solid-js';
import { Button, LinearProgress } from '@suid/material';
import { useServerList } from '../../components/ServerList/useServerList';
import ServerList from '../../components/ServerList/ServerList';
import { HomeContext } from '../../contexts/home';
import { DisplayServerItem } from "../../share/types";
import { toast } from "solid-toast";
import { IServerActionDefine } from "../../components/ServerList/types";
import { useDetailAction } from '../../components/ActionItem/useDetailAction';
import DetailAction from "../../components/ActionItem/DetailAction";

function FavoriteList() {
  const homeContext = useContext(HomeContext);

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
      return homeContext?.configStore.matchFavorite(s) ?? false;
    },
  });

  const { show, ...elProps } = useDetailAction();
  const actions: IServerActionDefine[] = [
    {
      title: '详情',
      onClick: show,
    },
    {
      title: '移除',
      onClick: async (s: DisplayServerItem) => {
        try {
          await homeContext?.configStore.removeFavorite(s);
          toast.success('已移除');
          await refreshList();
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
          刷新服务器列表
        </Button>
        <div class="ml-2">
          <Button
            variant="contained"
            color="warning"
            onClick={pingList}
            disabled={pingListLoading()}
          >
            一键测速
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

export default FavoriteList;

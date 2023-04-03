import { Button, LinearProgress } from '@suid/material';
import { Show, useContext } from 'solid-js';
import ServerList from '../../components/ServerList/ServerList';
import { useServerList } from '../../components/ServerList/useServerList';
import { IServerActionDefine } from '../../components/ServerList/types';
import { useDetailAction } from '../../components/ActionItem/useDetailAction';
import DetailAction from '../../components/ActionItem/DetailAction';
import { DisplayServerItem } from '../../share/types';
import { HomeContext } from '../../contexts/home';
import { toast } from 'solid-toast';

function AllList() {
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
  } = useServerList({ autoRefresh: true });

  const { show, ...elProps } = useDetailAction();
  const actions: IServerActionDefine[] = [
    {
      title: '详情',
      onClick: show,
    },
    {
      title: '收藏',
      onClick: async (s: DisplayServerItem) => {
        try {
          await homeContext?.configStore.addFavorite(s);
          toast.success('添加成功');
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

export default AllList;

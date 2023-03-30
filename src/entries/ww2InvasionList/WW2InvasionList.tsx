import { Show } from 'solid-js';
import { Button, LinearProgress } from '@suid/material';
import { useServerList } from '../../components/ServerList/useServerList';
import ServerList from '../../components/ServerList/ServerList';

function WW2InvasionList() {
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

  return (
    <div>
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
        data={serverList}
        latencyRecord={pingResult}
        pingLoading={pingLoading}
        onPing={pingSingle}
      />
    </div>
  );
}

export default WW2InvasionList;

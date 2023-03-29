import {
  Box,
  Button,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from '@suid/material';
import {
  createEffect,
  createSignal,
  mapArray,
  Match,
  Show,
  Switch,
} from 'solid-js';
import { invoke } from '@tauri-apps/api';
import { getServerList } from '../../share/services';
import { parseServerListFromString } from '../../share/utils';
import { DisplayServerItem } from '../../share/types';

function AllList() {
  const [serverList, setServerList] = createSignal<DisplayServerItem[]>([]);
  const [loading, setLoading] = createSignal(false);
  const [pingResult, setPingResult] = createSignal<Record<string, number>>({});
  const [pingLoading, setPingLoading] = createSignal<Record<string, boolean>>(
    {}
  );
  const [pingListLoading, setPingListLoading] = createSignal(false);

  async function refreshList() {
    try {
      setLoading(true);
      const res = await getServerList({
        start: 0,
        size: 20,
        names: 1,
      });

      console.log('res', res);

      const parsedData = parseServerListFromString(res.data as string);
      console.log('parsedData', parsedData);

      setServerList(parsedData);
      setPingResult({});
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function pingSingle(ip: string) {
    try {
      setPingLoading((prev) => {
        return {
          ...prev,
          [ip]: true,
        };
      });

      const res = await invoke('ping_server', {
        ip,
      });

      console.log('pingSingle res', res);

      setPingResult((prev) => {
        prev[ip] = res as number;
        return {
          ...prev,
        };
      });
    } catch (e) {
      console.error(e);
    } finally {
      setPingLoading((prev) => {
        return {
          ...prev,
          [ip]: false,
        };
      });
    }
  }

  async function pingList() {
    const newPingResult = serverList().reduce((acc, serverItem) => {
      acc[serverItem.ipAddress] = -1;
      return acc;
    }, {} as Record<string, number>);

    const ipArray = Object.keys(newPingResult);
    try {
      setPingListLoading(true);

      setPingLoading((prev) => {
        const next = { ...prev };

        ipArray.forEach((ip) => {
          next[ip] = true;
        });

        return next;
      });

      const res = (await invoke('ping_server_list', {
        ipVec: ipArray,
      })) as number[];

      ipArray.forEach((ip, index) => {
        newPingResult[ip] = res[index];
      });

      setPingResult(newPingResult);
    } catch (e) {
      console.error(e);
    } finally {
      setPingListLoading(false);
      setPingLoading((prev) => {
        const next = { ...prev };

        ipArray.forEach((ip) => {
          next[ip] = false;
        });

        return next;
      });
    }
  }

  createEffect(() => {
    refreshList();
  });

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
      <TableContainer component={Paper} class="max-h-96">
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>服务器名称</TableCell>
              <TableCell>IP</TableCell>
              <TableCell>端口</TableCell>
              <TableCell>玩家负载</TableCell>
              <TableCell>延迟</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mapArray(
              () => serverList(),
              (server) => (
                <TableRow>
                  <TableCell component="th">{server.name}</TableCell>
                  <TableCell component="th">{server.ipAddress}</TableCell>
                  <TableCell component="th">{server.port}</TableCell>
                  <TableCell component="th">
                    {server.currentPlayers}/{server.maxPlayers}
                  </TableCell>
                  <TableCell component="th">
                    <Show
                      when={!pingLoading()[server.ipAddress]}
                      fallback={<CircularProgress />}
                    >
                      <Switch fallback={pingResult()[server.ipAddress]}>
                        <Match
                          when={pingResult()[server.ipAddress] === undefined}
                        >
                          未测速
                        </Match>
                        <Match when={pingResult()[server.ipAddress] === -1}>
                          超时
                        </Match>
                      </Switch>
                    </Show>
                  </TableCell>
                  <TableCell component="th">
                    <Button
                      variant="text"
                      onClick={() => pingSingle(server.ipAddress)}
                      disabled={!!pingLoading()[server.ipAddress]}
                    >
                      测速
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AllList;

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
} from '@suid/material';
import { createEffect, createSignal, mapArray, Show } from 'solid-js';
import { getServerList } from '../../share/services';
import { parseServerListFromString } from '../../share/utils';
import { DisplayServerItem } from '../../share/types';

function AllList() {
  const [serverList, setServerList] = createSignal<DisplayServerItem[]>();
  const [loading, setLoading] = createSignal(false);

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
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function pingList() {
    //
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
        <Button
          variant="contained"
          color="warning"
          onClick={refreshList}
          disabled={loading()}
        >
          一键测速
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
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
                  <TableCell component="th">未测速</TableCell>
                  <TableCell component="th">测速?</TableCell>
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

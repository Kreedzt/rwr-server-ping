import { DisplayServerItem } from '../../share/types';
import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@suid/material';
import SignalCellular4BarIcon from '@suid/icons-material/SignalCellular4Bar';
import { Accessor, For, mapArray, Match, Show, Signal, Switch } from 'solid-js';

interface IServerListProps {
  data: Accessor<DisplayServerItem[]>;
  latencyRecord: Accessor<Record<string, number>>;
  pingLoading: Accessor<Record<string, boolean>>;
  onPing: (s: DisplayServerItem) => void;
}

function ServerList(props: IServerListProps) {
  const { data, pingLoading, latencyRecord, onPing } = props;

  return (
    <div>
      <TableContainer component={Paper} class="max-h-96">
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>服务器名称</TableCell>
              <TableCell>IP</TableCell>
              <TableCell>端口</TableCell>
              <TableCell>玩家负载</TableCell>
              <TableCell>
                <SignalCellular4BarIcon />
                延迟
              </TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <For each={data()}>
              {(server) => (
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
                      <Switch fallback={latencyRecord()[server.ipAddress]}>
                        <Match
                          when={latencyRecord()[server.ipAddress] === undefined}
                        >
                          未测速
                        </Match>
                        <Match when={latencyRecord()[server.ipAddress] === -1}>
                          超时
                        </Match>
                      </Switch>
                    </Show>
                  </TableCell>
                  <TableCell component="th">
                    <Button
                      disabled={pingLoading()[server.ipAddress]}
                      variant="text"
                      onClick={() => onPing(server)}
                    >
                      测速
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </For>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ServerList;

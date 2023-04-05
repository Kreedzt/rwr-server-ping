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
import { Accessor, For, mapArray, Match, Show, Signal, Switch } from 'solid-js';
import ActionList from './ActionList';
import { IServerActionDefine } from './types';
import { useTranslate } from '../../hooks/useTranslate';

interface IServerListProps {
  data: Accessor<DisplayServerItem[]>;
  latencyRecord: Accessor<Record<string, number>>;
  pingLoading: Accessor<Record<string, boolean>>;
  onPing: (s: DisplayServerItem) => void;
  containerClass?: string;
  actions?: IServerActionDefine[];
}

function ServerList(props: IServerListProps) {
  const t = useTranslate();

  const { data, pingLoading, latencyRecord, onPing, containerClass, actions } =
    props;

  return (
    <TableContainer component={Paper} class={containerClass}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>{t('column_server_name')}</TableCell>
            <TableCell>{t('column_ip')}</TableCell>
            <TableCell>{t('column_port')}</TableCell>
            <TableCell>{t('column_player_load')}</TableCell>
            <TableCell>{t('column_latency')}</TableCell>
            <TableCell>{t('column_action')}</TableCell>
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
                        {t('response_non_ping')}
                      </Match>
                      <Match when={latencyRecord()[server.ipAddress] === -1}>
                        {t('response_timeout')}
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
                    {t('ping')}
                  </Button>
                  <Show when={!!actions}>
                    <ActionList actions={actions!} data={server} />
                  </Show>
                </TableCell>
              </TableRow>
            )}
          </For>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ServerList;

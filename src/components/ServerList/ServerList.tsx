import { DisplayServerItem } from '../../share/types';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@suid/material';
import { mapArray } from 'solid-js';

interface IServerListProps {
  data: DisplayServerItem[];
}

function ServerList(props: IServerListProps) {
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
              <TableCell>延迟</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mapArray(
              () => props.data,
              (server) => (
                <TableRow>
                  <TableCell component="th">{server.name}</TableCell>
                  <TableCell component="th">{server.ipAddress}</TableCell>
                  <TableCell component="th">{server.port}</TableCell>
                  <TableCell component="th">
                    {server.currentPlayers}/{server.maxPlayers}
                  </TableCell>
                  <TableCell component="th"></TableCell>
                  <TableCell component="th">
                    <Button variant="text">测速</Button>
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

export default ServerList;

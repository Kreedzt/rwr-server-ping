import { XMLParser } from 'fast-xml-parser';
import { DisplayServerItem, Res } from './types';
import { getServerList } from './services';

const fixPlayerList = (raw: string | undefined | string[]): string[] => {
  if (Array.isArray(raw)) {
    return raw;
  }

  if (typeof raw === 'string') {
    return [raw];
  }

  return [];
};

export const parseServerListFromString = (
  resString: string
): DisplayServerItem[] => {
  const parser = new XMLParser();
  const res = parser.parse(resString) as Res;

  const serverList: DisplayServerItem[] = res.result.server.map((server) => {
    const block: DisplayServerItem = {
      name: server.name,
      ipAddress: server.address,
      port: server.port,
      mapId: server.map_id,
      mapName: server.map_name,
      bots: server.bots,
      country: server.country,
      currentPlayers: server.current_players,
      timeStamp: server.timeStamp,
      version: server.version,
      dedicated: server.dedicated === 1,
      mod: server.mod,
      playerList: fixPlayerList(server.player),
      comment: server.comment,
      url: server.url,
      maxPlayers: server.max_players,
      mode: server.mode,
      realm: server.realm,
    };

    return block;
  });

  return serverList;
};

export const getUnlimitedServerList = async () => {
  let start = 0;
  const size = 100;

  const totalServerList: DisplayServerItem[] = [];

  let parsedServerList: DisplayServerItem[] = [];

  do {
    const newServerList = await getServerList({
      start,
      size,
      names: 1,
    });

    parsedServerList = parseServerListFromString(newServerList.data as string);

    totalServerList.push(...parsedServerList);
    start += size;
  } while (parsedServerList.length === size);

  return totalServerList;
};

/**
 * @example "media/packages/vanilla/maps/map13" -> "map13"
 * @param str mapId,
 */
export const getMapNameByFullId = (mapId: string): string => {
  const group = mapId.split('/');
  const mapName = group[group.length - 1];

  return mapName;
};

export const getServerJoinCmd = (s: DisplayServerItem): string => {
  return `steam://rungameid/270150//server_address=${s.ipAddress}%20server_port=${s.port}`;
};

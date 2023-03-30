import { createEffect, createSignal } from 'solid-js';
import { DisplayServerItem } from '../../share/types';
import { getServerList } from '../../share/services';
import {
  getUnlimitedServerList,
  parseServerListFromString,
} from '../../share/utils';
import { invoke } from '@tauri-apps/api';

interface IUseServerListParams {
  autoRefresh: boolean;
  filter?: (server: DisplayServerItem) => boolean;
}

export const useServerList = (params: IUseServerListParams) => {
  const { autoRefresh, filter } = params;

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

      const resData = await getUnlimitedServerList();

      console.log('resData', resData);

      const nextData = resData.filter((server) => {
        if (filter) {
          return filter(server);
        }

        return true;
      });
      console.log('nextData', nextData);

      setServerList(nextData);
      setPingResult({});
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function pingSingle(server: DisplayServerItem) {
    const ip = server.ipAddress;
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
    if (autoRefresh) {
      refreshList();
    }
  });

  return {
    serverList,
    // setServerList,
    loading,
    // setLoading,
    pingResult,
    // setPingResult,
    pingLoading,
    // setPingLoading,
    pingListLoading,
    // setPingListLoading,
    refreshList,
    pingSingle,
    pingList,
  };
};

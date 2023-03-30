import { getClient, Response, ResponseType } from "@tauri-apps/api/http";
import { SERVER_API_URL } from '../constants';

export const getServerList = async (params: {
  start: number;
  size: number;
  names: 1 | 0;
}) => {
  const client = await getClient();

  const queryParams = {
    start: params.start ?? 0,
    size: params.size ?? 20,
    names: params.names ?? 1,
  };

  const url = `${SERVER_API_URL}/get_server_list.php?start=${queryParams.start}&size=${queryParams.size}&names=${queryParams.names}`;

  return client.get(url, {
    responseType: ResponseType.Text,
  });
};
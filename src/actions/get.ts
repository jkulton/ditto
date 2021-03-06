import constants from '../constants';
const { STATUS } = constants;
import { KVKey, Store, RequestContext, Result } from '../types';

async function handler(context: RequestContext): Promise<Result> {
  const { path, url, store } = context;
  let data;

  if (path === '') {
    data = await getRoutesList(url, store);
  } else {
    data = await store.get(path);
  }

  return {
    data,
    status: data === null ? STATUS.NOT_FOUND : STATUS.OK,
  };
}

async function getRoutesList(url: string, store: Store): Promise<string> {
  const list = await store.list();
  const { keys = [] } = list;
  const requestUrl = new URL(url);
  const data = keys.map((key: KVKey) => ({
    name: key.name,
    url: requestUrl.origin + key.name,
  }));
  return JSON.stringify(data);
}

export default { handler };

import constants from '../constants';
const { STATUS } = constants;
import { RequestContext, Store, Result } from '../types';

export async function handler(context: RequestContext): Promise<Result> {
  const { path, store } = context;
  if (path === '') {
    await deleteAllRoutes(store);
  } else {
    await store.delete(path);
  }

  return { data: null, status: STATUS.OK };
}

async function deleteAllRoutes(store: Store): Promise<void> {
  const list = await store.list();
  const { keys } = list;

  for (const i in keys) {
    const key = keys[i];
    await store.delete(key.name);
  }
}

export default { handler };

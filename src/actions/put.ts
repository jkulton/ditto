import { RequestContext, Result } from '../types';
import constants from '../constants';
const { STATUS, PUT_CONTENT_TYPE } = constants;

async function handler(context: RequestContext): Promise<Result> {
  const { path, body, store } = context;
  await store.put(path, body);
  return { data: body, status: STATUS.OK };
}

async function validator(context: RequestContext): Promise<Result> {
  const { body, path, contentType } = context;

  // Validate Content-Type
  if (!contentType.startsWith(PUT_CONTENT_TYPE)) {
    return {
      error: "Content-Type must be 'application/json' for PUT requests",
      status: STATUS.UNSUPPORTED_MEDIA_TYPE,
    };
  }

  // Validate formatted JSON body
  try {
    await JSON.parse(body);
  } catch (e) {
    return { error: 'Invalid JSON', status: STATUS.BAD_REQUEST };
  }

  // Validate on non-base path
  if (path === '') {
    return { error: 'Cannot PUT origin', status: STATUS.BAD_REQUEST };
  }

  return {};
}

export default { handler, validator };

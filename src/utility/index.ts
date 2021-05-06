import constants from '../constants';
const { STATUS, RESPONSE_HEADERS } = constants;
import { RequestContext } from '../types';

export function parseURLPath(url: string): string {
  const requestUrl = new URL(url);
  let { pathname } = requestUrl;

  // Remove trailing '/' if it exists
  if (pathname[pathname.length - 1] === '/') {
    pathname = pathname.slice(0, pathname.length - 1);
  }

  return pathname;
}

export function handleError(error: Error): Response {
  console.log('*** ERROR ***');
  console.log(error);
  const data = { error: error.message, code: 500 };
  return new Response(JSON.stringify(data), {
    headers: RESPONSE_HEADERS,
    status: STATUS.INTERNAL_SERVER_ERROR,
  });
}

export async function getRequestContext(request: Request): Promise<RequestContext> {
  const path = parseURLPath(request.url);
  const { method, url } = request;
  const body = await request.text();
  const contentType = request.headers.get('Content-Type') || '';

  return { method, url, path, body, contentType, store: REPEAT_KV };
}
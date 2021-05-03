import { parseURLPath, handleError } from './utility';
import { ActionList } from './types';
import constants from './constants';
import actions from './actions';

const { RESPONSE_HEADERS, STATUS } = constants;

addEventListener('fetch', (event) => {
  const response = handleRequest(event.request).catch(handleError);
  event.respondWith(response);
});

async function handleRequest(request: Request): Promise<Response> {
  const path = parseURLPath(request.url);
  const { method, url } = request;
  const body = await request.text();
  const action = actions[method];
  const contentType = request.headers.get('Content-Type') || '';
  const requestContext = { url, path, body, contentType, store: REPEAT_KV };

  if (!action) {
    return new Response(null, {
      headers: RESPONSE_HEADERS,
      status: STATUS.NOT_IMPLEMENTED,
    });
  }

  const { validator, handler } = action;

  if (validator) {
    const result = await validator(requestContext);

    if (result.error) {
      return new Response(result.error, {
        headers: RESPONSE_HEADERS,
        status: result.status,
      });
    }
  }

  const result = await handler(requestContext);

  return new Response(result.data, {
    headers: RESPONSE_HEADERS,
    status: result.status,
  });
}

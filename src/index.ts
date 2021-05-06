import { parseURLPath, handleError, getRequestContext } from './utility';
import constants from './constants';
import actions from './actions';

const { RESPONSE_HEADERS, STATUS } = constants;

addEventListener('fetch', (event) => {
  const response = handleRequest(event.request).catch(handleError);
  event.respondWith(response);
});

async function handleRequest(request: Request): Promise<Response> {
  const requestContext = await getRequestContext(request);
  const action = actions[requestContext.method];

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

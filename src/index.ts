import { handleError, getRequestContext } from './utility';
import constants from './constants';
import actions from './actions';

const { RESPONSE_HEADERS, PSK_AUTH_HEADER_KEY, STATUS } = constants;

addEventListener('fetch', (event) => {
  const response = handleRequest(event.request).catch(handleError);
  event.respondWith(response);
});

async function handleRequest(request: Request): Promise<Response> {
  const requestContext = await getRequestContext(request, DITTO_KV);
  const action = actions[requestContext.method];

  // If auth is enabled check auth before continuing
  if (typeof DITTO_PSK !== 'undefined') {
    const providedAuth = request.headers.get(PSK_AUTH_HEADER_KEY);
    if (DITTO_PSK !== providedAuth) {
      return new Response("Invalid or missing authorization.", {
        headers: RESPONSE_HEADERS,
        status: STATUS.FORBIDDEN
      });
    }
  }

  // If HTTP request method doesn't match a supported action return error
  if (!action) {
    return new Response(null, {
      headers: RESPONSE_HEADERS,
      status: STATUS.NOT_IMPLEMENTED,
    });
  }

  // If HTTP action requires validation we check before continuing
  if (action.validator) {
    const result = await action.validator(requestContext);

    if (result) {
      return new Response(result.data, {
        headers: RESPONSE_HEADERS,
        status: result.status,
      });
    }
  }

  // Get result of action
  const result = await action.handler(requestContext);

  // Create response for client
  return new Response(result.data, { headers: RESPONSE_HEADERS, status: result.status });
}

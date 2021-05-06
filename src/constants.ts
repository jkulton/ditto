export default {
  PSK_AUTH_HEADER_KEY: 'X-Ditto-PSK',
  PUT_CONTENT_TYPE: 'application/json',
  RESPONSE_HEADERS: {
    'content-type': 'application/json;charset=UTF-8',
  },
  STATUS: {
    OK: 200,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNSUPPORTED_MEDIA_TYPE: 415,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
  },
};

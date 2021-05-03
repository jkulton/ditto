import tap from 'tap';
import putAction from './put';
import constants from '../constants';
const { STATUS } = constants;

tap.test('handler puts data in store and returns to user', async (t) => {
  const body = '{"name":"Steve Rogers"}';
  const requestContext = {
    body,
    contentType: '',
    path: '/hero',
    url: 'https://example.com/hero',
    store: {
      list: () => {},
      delete: () => {},
      get: () => {},
      put: async (key, val) => {
        t.equal(key, '/hero');
        t.equal(val, body);
      },
    },
  };

  const expected = { data: body, status: 200 };
  const got = await putAction.handler(requestContext);

  t.match(expected, got);
  t.end();
});

tap.test('validator cathces bad Content-Type', async (t) => {
  const requestContext = {
    body: '{"name":"Steve Rogers"}',
    contentType: 'asdf',
    path: '/hero',
    url: 'https://example.com/hero',
    store: {
      list: () => {},
      delete: () => {},
      get: () => {},
      put: () => {},
    },
  };

  const expected = STATUS.UNSUPPORTED_MEDIA_TYPE;
  const result = await putAction.validator(requestContext);
  const got = result.status;

  t.match(expected, got);
  t.end();
});

tap.test('validator cathces invalid JSON', async (t) => {
  const requestContext = {
    body: 'abc',
    contentType: 'application/json',
    path: '/hero',
    url: 'https://example.com/hero',
    store: {
      list: () => {},
      delete: () => {},
      get: () => {},
      put: () => {},
    },
  };

  const expected = STATUS.BAD_REQUEST;
  const result = await putAction.validator(requestContext);
  const got = result.status;

  t.match(expected, got);
  t.end();
});

tap.test('validator cathces PUT attempts on base path', async (t) => {
  const requestContext = {
    body: '{"name":"Steve Rogers"}',
    contentType: 'application/json',
    path: '',
    url: 'https://example.com',
    store: {
      list: () => {},
      delete: () => {},
      get: () => {},
      put: () => {},
    },
  };

  const expected = STATUS.BAD_REQUEST;
  const result = await putAction.validator(requestContext);
  const got = result.status;

  t.match(expected, got);
  t.end();
});

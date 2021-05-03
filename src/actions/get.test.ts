import tap from 'tap';
import getAction from './get';

tap.test('handler returns the routes list on the origin', async (t) => {
  const requestContext = {
    contentType: '',
    body: '',
    path: '',
    url: 'https://example.com',
    store: {
      list: async () => {
        return { keys: [{ name: '/a' }, { name: '/a/b' }] };
      },
      delete: () => {},
      get: () => {},
      put: () => {},
    },
  };

  const expected = {
    data: JSON.stringify([
      { name: '/a', url: 'https://example.com/a' },
      { name: '/a/b', url: 'https://example.com/a/b' },
    ]),
    status: 200,
  };
  const got = await getAction.handler(requestContext);

  t.match(expected, got);
  t.end();
});

tap.test('handler the data for a specific route', async (t) => {
  const requestContext = {
    contentType: '',
    body: '',
    path: '/users/1',
    url: 'https://example.com',
    store: {
      list: () => {},
      delete: () => {},
      get: async (key) => {
        t.equal(key, '/users/1');
        return '{"name":"Loki"}';
      },
      put: () => {},
    },
  };

  const expected = {
    data: JSON.stringify({ name: 'Loki' }),
    status: 200,
  };
  const got = await getAction.handler(requestContext);

  t.match(expected, got);
  t.end();
});

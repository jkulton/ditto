import tap from 'tap';
import deleteAction from './delete';

tap.test('handler deletes for the provided path', async (t) => {
  const requestContext = {
    contentType: '',
    body: '',
    path: '/special-path',
    url: '',
    method: 'DELETE',
    store: {
      list: () => {},
      delete: async function (key) {
        t.equal(key, '/special-path');
      },
      get: () => {},
      put: () => {},
    },
  };

  const expected = { data: null, status: 200 };
  const got = await deleteAction.handler(requestContext);

  t.match(expected, got);
  t.end();
});

import tap from 'tap';
import { parseURLPath, handleError } from './index';

tap.test('parseURLPath returns path from request url', (t) => {
  const expected = '/a/b/c/1';
  const got = parseURLPath('https://example.com/a/b/c/1');
  t.equal(expected, got);
  t.end();
});

tap.test('parseURLPath strips trailing slash from path', (t) => {
  const expected = '/a/b/c/1';
  const got = parseURLPath('https://example.com/a/b/c/1/');
  t.equal(expected, got);
  t.end();
});

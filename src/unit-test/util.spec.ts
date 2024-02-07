import { describe, expect, test } from 'vitest';

import { extractContent, getFileName } from '../utils';

const env1 = 'src/test/.env';
const emptyEnvFilePath = 'src/test/.env.empty';
const env2 = 'src/test/.env.2';

describe('get file name', () => {
  test('return file.txt', () => {
    expect(getFileName('/path/to/my/file.txt')).toBe('file.txt');
  });
});

describe('get file content', () => {
  test('extract all the fields correctly', () => {
    expect(extractContent(env1)).toContain(`API_KEY=\nDATABASE_HOST=\nDATABASE_PORT=\nDATABASE_NAME=\nDATABASE_USER=\nDATABASE_PASSWORD=`);
  });
});

describe('empty .env to return empty string', () => {
  test('extract all the fields correctly', () => {
    expect(extractContent(emptyEnvFilePath)).toContain('');
  });
});

describe('env with weird symnbols', () => {
  test('extract all the fields correctly', () => {
    expect(extractContent(emptyEnvFilePath)).toContain('');
  });
});

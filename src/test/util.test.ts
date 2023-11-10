import { describe, expect, test } from 'vitest';

import { extractContent, extractContentForZodSchema, getFileName } from '../utils';

const env1 = 'src/test/.env'
const emptyEnvFilePath = 'src/test/.env.empty'
const env2 = 'src/test/.env.2'
const env3 = 'src/test/.env.3'

describe('get file name', () => {
  test('return file.txt', () => {
    expect(getFileName('/path/to/my/file.txt')).toBe('file.txt')
  });
});

describe('get file content', () => {
  test('extract all the fields correctly', () => {
    expect(extractContent(env1)).toContain(`API_KEY=\nDATABASE_HOST=\nDATABASE_PORT=\nDATABASE_NAME=\nDATABASE_USER=\nDATABASE_PASSWORD=`)
  })
})

describe('empty .env to return empty string', () => {
  test('extract all the fields correctly', () => {
    expect(extractContent(emptyEnvFilePath)).toContain('')
  })
})

describe('env with weird symnbols', () => {
  test('extract all the fields correctly', () => {
    expect(extractContent(emptyEnvFilePath)).toContain('')
  })
})

describe('extract content for zod', () => {
  test('extract type correctly', () => {
    expect(extractContentForZodSchema(env3)).toBeDefined()
  })
})

describe('generate zod file with type correctly', () => {
  test('extract all contents correctly', () => {
    expect(extractContentForZodSchema(env1)).toMatchSnapshot()
    expect(extractContentForZodSchema(env2)).toMatchSnapshot()
    expect(extractContentForZodSchema(emptyEnvFilePath)).toMatchSnapshot()
  })
})
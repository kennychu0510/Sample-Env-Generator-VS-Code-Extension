import { afterEach, describe, expect, test } from 'vitest';
import * as fs from 'fs'
import { extractContent, extractContentForZodSchema, generateSampleEnv, getFileName } from '../utils';

const env1 = 'src/test/.env'
const emptyEnvFilePath = 'src/test/.env.empty'
const env2 = 'src/test/.env.2'
const env3 = 'src/test/.env.3'
const env4 = 'src/test/.env.4'

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
    expect(extractContentForZodSchema(env4)).toMatchSnapshot()
  })
})


describe('generate env file correctly', () => {
  test('extract all contents correctly', () => {
    expect(extractContent(env1)).toMatchSnapshot()
    expect(extractContent(env2)).toMatchSnapshot()
    expect(extractContent(emptyEnvFilePath)).toMatchSnapshot()
    expect(extractContent(env4)).toMatchSnapshot()
  })
})

describe('generate sample env', () => {
  afterEach(async () => {
    if (fs.existsSync(__dirname + '/.env.sample')) {
      fs.unlinkSync(__dirname + '/.env.sample')
    }
  })
  test('should generate sample env correctly', async () => {
      generateSampleEnv(__dirname + '/.env')
      await sleep(200)
      const output = fs.readFileSync(__dirname + '/.env.sample', {encoding: 'utf-8'})
      expect(output).toMatch(`API_KEY=\nDATABASE_HOST=\nDATABASE_PORT=\nDATABASE_NAME=\nDATABASE_USER=\nDATABASE_PASSWORD=`)
  })
})

function sleep(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
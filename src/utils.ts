import * as fs from 'fs';
import * as path from 'path';

export function getFileName(filePath: string) {
  return path.parse(filePath).base;
}

export function generateFile(filePath: string, content: string) {
  fs.writeFile(filePath + '.sample', content, (err) => {
    if (err) {
      throw new Error(err.message);
    }
  });
}

const regex = /^([^=]+)=/;

export function extractContent(filePath: string) {
  const content = fs.readFileSync(filePath, { encoding: 'utf-8' });
  const lines = content.split('\n');
  const outputContent: string[] = lines.map((item) => {
    const match = item.match(regex);
    if (match) {
      return match.at(1) + '=' ?? '';
    }
    return '';
  });
  return outputContent.join('\n');
}

export function generateSampleEnv(filePath: string) {
  const content = extractContent(filePath);
  generateFile(filePath, content);
}

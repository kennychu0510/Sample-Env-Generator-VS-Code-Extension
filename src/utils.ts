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
    const match = RegExp(regex).exec(item);
    if (match) {
      return match.at(1) + '=';
    }
    return '';
  });
  return outputContent.join('\n');
}

export function extractContentForZodSchema(filePath: string) {
  const content = fs.readFileSync(filePath, { encoding: 'utf-8' });
  const lines = content.split('\n');
  const outputContent: string[] = lines.map((item) => {
    const match = RegExp(regex).exec(item);
    if (match) {
      const value = item.replace(match.at(1) + '=', '')
      const isNumber = !isNaN(Number(value)) && value.length > 0
      const zodType = isNumber ? 'z.number()' : 'z.string()'
      return '\t' + match.at(1) + `: ${zodType},`
    }
    return '';
  });
  return outputContent.join('\n');
}

export function generateSampleEnv(filePath: string) {
  const content = extractContent(filePath);
  generateFile(filePath, content);
}

export function generateZodSchema(filePath: string) {
  const fileName = path.basename(filePath)
  const content = extractContentForZodSchema(filePath);
  const zodFileContent = zodSchemaStart + content + zodSchemaEnd
  fs.writeFile(filePath.replace(fileName, '') + 'env.ts', zodFileContent, (err) => {
    if (err) {
      throw new Error(err.message);
    }
  });
}

const zodSchemaStart = `import z from 'zod'\n\nconst envSchema = z.object({\n`
const zodSchemaEnd = `\n})\n\nexport const ENV = envSchema.parse(process.env)`
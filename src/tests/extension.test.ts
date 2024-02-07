import * as assert from 'assert';
import * as path from 'path';
import * as fs from 'fs';
import * as vscode from 'vscode';

const workspaceFolder = path.join(__dirname, '..', '..', 'src', 'tests', 'resources');
const validationFolder =  path.join(__dirname, '..', '..', 'src', 'tests', 'validation');

suite('Sample Env Generator', () => {
  test('Scenario 1: Generate .env', async () => {
    await cleanUpSampleEnvFiles();
    assert.ok(fs.existsSync(path.join(workspaceFolder, '.env')));

    vscode.commands.executeCommand('sample-env-generator.generateSampleEnv', vscode.Uri.file(path.join(workspaceFolder, '.env')));
    await sleep();
    assert.ok(fs.existsSync(path.join(workspaceFolder, '.env.sample')));
    const validationFile = fs.readFileSync(path.join(validationFolder, '.env.sample'), 'utf-8');
    const generatedFile = fs.readFileSync(path.join(workspaceFolder, '.env.sample'), 'utf-8');
    assert.strictEqual(validationFile, generatedFile);
  });

  test('Scenario 2: Generate .env.2', async () => {
    await cleanUpSampleEnvFiles();
    assert.ok(fs.existsSync(path.join(workspaceFolder, '.env.2')));

    vscode.commands.executeCommand('sample-env-generator.generateSampleEnv', vscode.Uri.file(path.join(workspaceFolder, '.env.2')));
    await sleep();
    assert.ok(fs.existsSync(path.join(workspaceFolder, '.env.2.sample')));
    const validationFile = fs.readFileSync(path.join(validationFolder, '.env.2.sample'), 'utf-8');
    const generatedFile = fs.readFileSync(path.join(workspaceFolder, '.env.2.sample'), 'utf-8');
    assert.strictEqual(validationFile, generatedFile);
  });

  test('Scenario 3: Generate .env.empty', async () => {
    await cleanUpSampleEnvFiles();
    assert.ok(fs.existsSync(path.join(workspaceFolder, '.env.empty')));

    vscode.commands.executeCommand('sample-env-generator.generateSampleEnv', vscode.Uri.file(path.join(workspaceFolder, '.env.empty')));
    await sleep();
    assert.ok(fs.existsSync(path.join(workspaceFolder, '.env.empty.sample')));
    const validationFile = fs.readFileSync(path.join(validationFolder, '.env.empty.sample'), 'utf-8');
    const generatedFile = fs.readFileSync(path.join(workspaceFolder, '.env.empty.sample'), 'utf-8');
    assert.strictEqual(validationFile, generatedFile);
  });

  test('Scenario 4: Generate .env', async () => {
    await cleanUpSampleEnvFiles();
    assert.ok(fs.existsSync(path.join(workspaceFolder, '.env')));

    vscode.commands.executeCommand('sample-env-generator.generateSampleEnv');
    await sleep();
    assert.ok(fs.existsSync(path.join(workspaceFolder, '.env.sample')));
    const validationFile = fs.readFileSync(path.join(validationFolder, '.env.sample'), 'utf-8');
    const generatedFile = fs.readFileSync(path.join(workspaceFolder, '.env.sample'), 'utf-8');
    assert.strictEqual(validationFile, generatedFile);
  });

}); 

function sleep(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function cleanUpSampleEnvFiles() {
  const files = fs.readdirSync(workspaceFolder);
  files.forEach(file => {
    if (file.endsWith('.sample')) {
      fs.unlinkSync(path.join(workspaceFolder, file));
    }
  })
}
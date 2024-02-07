import * as assert from 'assert';
import * as path from 'path';
import * as fs from 'fs';
import * as vscode from 'vscode';

const workspaceFolder = path.join(__dirname, '..', '..', 'src', 'tests', 'resources');

suite('Sample Env Generator', () => {
  test('Scenario 1: Generate .env', async () => {
    assert.ok(fs.existsSync(path.join(workspaceFolder, '.env')));
  });
}); 
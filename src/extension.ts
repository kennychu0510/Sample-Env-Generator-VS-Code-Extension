// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { generateSampleEnv, generateZodSchema } from './utils';
import * as path from 'path';
import * as fs from 'fs';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('env sample generator is active');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json

  context.subscriptions.push(
    vscode.commands.registerCommand('sample-env-generator.generateSampleEnv', async (selectedFile: vscode.Uri | undefined) => {
      if (!selectedFile) {
        //get root directory path
        const rootDir = vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0] ? vscode.workspace.workspaceFolders[0].uri.fsPath : null;
        if (rootDir && fs.existsSync(path.join(rootDir, '.env'))) {
          selectedFile = vscode.Uri.file(path.join(rootDir, '.env'));
        } else {
          vscode.window.showErrorMessage('No .env found in current directory');
          return;
        }
      }
      try {
        generateSampleEnv(selectedFile.fsPath);
        vscode.window.showInformationMessage('.env sample file created successfully!');
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          vscode.window.showErrorMessage(error.message);
        }
      }
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand('sample-env-generator.generateZodSchema', async (selectedFile: vscode.Uri | undefined) => {
      console.log(selectedFile?.path);
      if (!selectedFile) {
        vscode.window.showErrorMessage('no env file selected');
        return;
      }
      try {
        generateZodSchema(selectedFile.fsPath);
        vscode.window.showInformationMessage('Zod schema created successfully!');
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          vscode.window.showErrorMessage(error.message);
        }
      }
    })
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}

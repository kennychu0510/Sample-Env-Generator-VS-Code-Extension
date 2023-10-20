// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { generateSampleEnv } from './utils';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Image import generator is active');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json

  context.subscriptions.push(
    vscode.commands.registerCommand('sample-env-generator.generateSampleEnv', async (selectedFile: vscode.Uri | undefined) => {
      console.log(selectedFile?.path)
      if (!selectedFile) {
        vscode.window.showErrorMessage('no env file selected');
        return
      }
			try {
				generateSampleEnv(selectedFile.path)
				vscode.window.showInformationMessage('.env sample file created successfully!');
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


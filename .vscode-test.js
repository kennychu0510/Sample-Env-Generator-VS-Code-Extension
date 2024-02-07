const { defineConfig } = require('@vscode/test-cli');

module.exports = defineConfig({
  files: 'out/**/*.test.js',
  workspaceFolder: 'src/tests/resources',
  mocha: {
    ui: 'tdd',
    timeout: 10000,
  },
});

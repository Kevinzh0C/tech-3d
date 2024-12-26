const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/integration/**/*.cy.{js,jsx}',
    baseUrl: 'http://localhost:5173'
  }
});

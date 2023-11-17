const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    specPattern: "cypress/tests/*/*.{js,jsx,ts,tsx,feature}",
    baseUrl: 'https://api.openweathermap.org/data/2.5'
  },
  failOnStatusCode: false
});

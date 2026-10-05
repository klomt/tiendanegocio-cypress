const { defineConfig } = require("cypress");
const fs = require('fs');
const mysql = require('mysql2/promise');

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      on("task",{
        log(mensaje){
          console.log(mensaje)
          return null
        }
      })
    },
  },
});

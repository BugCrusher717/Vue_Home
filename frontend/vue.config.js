'use strict'

const fs = require('fs')

module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    https: {
      key: fs.readFileSync("./certs/server.key"),
      cert: fs.readFileSync("./certs/server.crt"),
      ca: fs.readFileSync("./certs/rootCA.pem")
    },
    // hotOnly: true
  }
}
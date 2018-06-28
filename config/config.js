const { decrypt } = require('../encrypt');

const serverConfig = {
  host: `${decrypt(process.argv.slice(2)[0])}.mysql.database.azure.com`,
  user: `myadmin@${decrypt(process.argv.slice(2)[0])}`,
  password: decrypt(process.argv.slice(3)[0]),
  database: 'contestants',
  port: 3306,
  ssl: true,
};

const config = { serverConfig, LOCAL_PORT: 8880 };

module.exports = config;

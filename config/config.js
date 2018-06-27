/* thaidemoserver  */
const LOCAL_PORT = 8880;

const serverConfig = {
    host: `${process.argv.slice(2)}.mysql.database.azure.com`,
    user: `myadmin@${process.argv.slice(2)}`,
    password: 'Kewl1os1s',
    database: 'contestants',
    port: 3306,
    ssl: true
  };

const localConfig = {
 port: LOCAL_PORT,
}

const config = {
  serverConfig,
  localConfig,
};

module.exports = config;

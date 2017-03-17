module.exports = {
    dev: {
      server: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DATABASE,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      port: process.env.MYSQL_PORT,
    }
};

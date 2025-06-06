require('ts-node').register();

module.exports = {
  development: {
    username: 'root',
    password: null,
    database: 'incisive_care',
    host: 'localhost',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: null,
    database: 'incisive_care_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: null,
    database: 'incisive_care_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};

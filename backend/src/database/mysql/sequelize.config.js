import 'ts-node/register';

const config = {
  development: {
    username: 'root',
    password: '123456',
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

export default config;

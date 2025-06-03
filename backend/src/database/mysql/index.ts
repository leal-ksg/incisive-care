/* eslint-disable no-console */
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(process.env.MYSQL_CONNECTION_STRING!);

export const connectMysql = async () => {
  try {
    sequelize.authenticate();
    console.log('MySQL successfully connected!');
  } catch (error) {
    console.error(`MySQL connection error: `, error);
  }
};

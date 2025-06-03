/* eslint-disable no-console */
import express from 'express';
import { config } from 'dotenv';
config();

import cors from 'cors';
import { connectMongoDB } from './database/mongo';
import router from './routes';
import { connectMysql } from './database/mysql';

async function main() {
  process.on('unhandledRejection', reason => {
    console.error('Unhandled Rejection:', reason);
  });

  process.on('uncaughtException', err => {
    console.error('Uncaught Exception:', err);
  });

  connectMongoDB();
  connectMysql();

  const server = express();
  server.use(cors());
  server.use(express.json());
  server.use('/api', router);

  server.listen(process.env.PORT, () => {
    console.log(`Server running at port ${process.env.PORT}!`);
  });
}

main();

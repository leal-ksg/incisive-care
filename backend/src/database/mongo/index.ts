/* eslint-disable no-console */
import mongoose from 'mongoose';

export const connectMongoDB = () => {
  mongoose.connect(process.env.MONGO_CONNECTION_STRING!);
  const db = mongoose.connection;

  db.on('error', err => {
    console.log("Error on Mongoose's connection: ", err);
  });

  db.once('open', () => {
    console.log('MongoDB successfully connected!');
  });
};

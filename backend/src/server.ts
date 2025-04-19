import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { connectDatabase } from "./db";

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

config();
connectDatabase();

const server = express();
server.use(cors());
server.use(express.json());

server.listen(process.env.PORT, () => {
  console.info(`Server running at port ${process.env.PORT}!`);
});

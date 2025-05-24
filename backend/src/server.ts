import express from "express";
import { config } from "dotenv";
config();

import cors from "cors";
import { connectMongoDB } from "./databases/mongo";
import router from "./routes";
import { connectMysql } from "./databases/mysql";

async function main() {
  process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection:", reason);
  });

  process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
  });

  connectMongoDB();
  connectMysql();

  const server = express();
  server.use(cors());
  server.use(express.json());
  server.use("/api", router);

  server.listen(process.env.PORT, () => {
    console.info(`Server running at port ${process.env.PORT}!`);
  });
}

main();

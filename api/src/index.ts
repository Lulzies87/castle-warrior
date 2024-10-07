import "dotenv/config";
import { createServer } from "http";
import express from "express";
import mongoose from "mongoose";
import { json } from "body-parser";
import { Level } from "./Models/level.model";

const app = express();

app.use(json());

app.get("/check", (_, res) => {
  res.status(200);
  res.send("Hello");
});

app.get("/levels", async (req, res) => {
  try {
    const levelsData = await Level.findById("670283389c495ca6e7a771df");

    res.status(200);
    res.json(levelsData);
  } catch (error) {
    console.error(error);
  }
});

const server = createServer(app);
const port = process.env.port ?? 3000;

async function startServer() {
  if (!process.env.CONN_STRING) {
    throw new Error("Must provide a connection string");
  }

  await mongoose.connect(process.env.CONN_STRING, {
    dbName: "castle-warrior",
  });

  server.listen(port, () => console.log(`Listening on port ${port}`));
}

startServer();

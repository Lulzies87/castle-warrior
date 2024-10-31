import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import { json } from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";

export const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser(process.env.COOKIE_SECRET));

const PORT = process.env.PORT ?? 3000;

export async function startServer() {
  if (!process.env.CONN_STRING) {
    throw new Error("Must provide a connection string");
  }

  try {
    await mongoose.connect(process.env.CONN_STRING, {
      dbName: "castle-warrior",
    });

    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (error) {
    console.error(
      "Failed to connect to the database or start the server",
      error
    );
    process.exit(1);
  }
}

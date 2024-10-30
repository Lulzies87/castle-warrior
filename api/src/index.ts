import "dotenv/config";
import { createServer } from "http";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { json } from "body-parser";
import bcrypt from "bcrypt";
import { User } from "./Models/user.model";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(json());

app.get("/users", async (_, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      res.status(409).json({ message: "Username already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (!user) {
      res.status(404).json({ message: "Username wasn't found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.status(200).json({ message: "User connected successfully" });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/deleteUser", async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username: username });

    if (!user) {
      res.status(404).json({ message: "Username wasn't found" });
      return;
    }

    await user.deleteOne();

    res.status(200).json({ message: "User was deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
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

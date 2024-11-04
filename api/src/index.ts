import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./Models/user.model";
import { app, startServer } from "./server";

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (!user) {
      res.status(404).json({ message: "Username wasn't found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    } else {
      const token = jwt.sign({ username }, process.env.JWT_SECRET as string);

      const cookieSettings = {
        maxAge: 3600000,
        signed: true,
        domain: process.env.DOMAIN,
      };

      res
        .status(200)
        .cookie("token", token, cookieSettings)
        .json({ message: "User connected successfully" });
    }
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

    const token = jwt.sign({ username }, process.env.JWT_SECRET as string);

    const cookieSettings = {
      maxAge: 3600000,
      signed: true,
      domain: process.env.DOMAIN,
    };

    res
      .status(201)
      .cookie("token", token, cookieSettings)
      .json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/guest", (_, res) => {
  const guestToken = generateGuestToken();

  const cookieSettings = {
    maxAge: 3600000,
    signed: true,
    domain: process.env.DOMAIN,
  };

  res
    .status(200)
    .cookie("token", guestToken, cookieSettings)
    .json({ message: "Guest connected successfully" });
});

app.get("/checkUsername", async (req, res) => {
  const { username } = req.query;

  try {
    const existingUser = await User.findOne({ username }).select("username");
    if (existingUser) {
      res.status(400).json({ message: "Username already taken" });
    } else {
      res.status(200).json({ message: "Username available" });
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

function generateGuestToken() {
  return "guest-token-" + Math.random().toString(36).slice(2, 11);
}

startServer();

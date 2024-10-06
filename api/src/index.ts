import "dotenv/config";

import express from "express";
// import cors from "cors";
import { json } from "body-parser";

const app = express();

// app.use(cors());
app.use(json());

app.get("/check", (req, res) => {
  res.status(200);
  res.send("Hello");
});

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

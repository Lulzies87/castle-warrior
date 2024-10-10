import { Schema, model } from "mongoose";

interface User {
  username: string;
  password: string;
}

const schema = new Schema<User>({
  username: String,
  password: String,
});

export const User = model<User>("User", schema, "users");

import { Schema, model } from "mongoose";

interface Level {
  backgroundImageSrc: string;
}

const schema = new Schema<Level>({
  backgroundImageSrc: String,
});

export const Level = model<Level>("Level", schema, "levels");
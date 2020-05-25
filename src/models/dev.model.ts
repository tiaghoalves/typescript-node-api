/* eslint-disable no-unused-vars */
import mongoose, { Schema } from "mongoose";
import PointSchema from "./utils/PointSchema";
import { IDevModel } from "./interfaces";

const DevSchema: Schema = new Schema({
  name: String,
  github_username: String,
  bio: String,
  avatar_url: String,
  techs: [String],
  location: {
    type: PointSchema,
    index: "2dsphere",
  },
});

export default mongoose.model<IDevModel>("Dev", DevSchema);

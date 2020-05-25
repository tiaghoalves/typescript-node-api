/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import mongoose from "mongoose";

export interface IDevModel extends mongoose.Document {
  name: string;
  github_username: string;
  bio: string;
  avatar_url: string;
  techs: string[];
  location: object;
}

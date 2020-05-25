/* eslint-disable no-unused-vars */
import axios from "axios";
import Dev from "../models/dev.model";
import { Request, Response, NextFunction } from "express";
import {
  IPostRequestBody,
  IPutRequestParams,
  ApiData,
  ApiResponse,
  IPutRequestBody,
} from "../types";
import { parseArrayAsString } from "../utils";

// GET /devs
export const index = async (req: Request, res: Response) => {
  try {
    const devs = await Dev.find({});

    res.json(devs);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// POST /devs
export const store = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      // eslint-disable-next-line camelcase
      github_username,
      techs,
      latitude,
      longitude,
    }: IPostRequestBody = req.body;

    const hasDev = await Dev.findOne({ github_username });

    if (hasDev) {
      return res.json({ message: "Dev já cadastrado" });
    }

    const apiResponse = await axios.get(
      // eslint-disable-next-line camelcase
      `https://api.github.com/users/${github_username}`
    );

    // eslint-disable-next-line camelcase
    const { login, avatar_url, bio, name } = apiResponse.data;

    const techsArray = parseArrayAsString(techs);

    const location = {
      type: "Point",
      coordinates: [longitude, latitude],
    };

    const dev = await Dev.create({
      name: name || login,
      github_username,
      bio,
      avatar_url,
      techs: techsArray,
      location,
    });

    return res.json(dev);
  } catch (err) {
    next(err);
  }
};

// PUT /devs/:id
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id }: IPutRequestParams = req.params;
    const devFinded = await Dev.findOne({ _id: id });
    const {
      name,
      techs,
      bio,
      // eslint-disable-next-line camelcase
      avatar_url,
      latitude,
      longitude,
    }: IPutRequestBody = req.body;

    if (!devFinded) {
      return res
        .status(404)
        .json({ message: "Dev não existente na base de dados." });
    }

    const location = {
      type: "Point",
      coordinates: [longitude, latitude],
    };

    const query = { _id: id };
    const options = { new: true };
    const doc = {
      name: name || devFinded.name,
      bio: bio || devFinded.bio,
      // eslint-disable-next-line camelcase
      avatar_url: avatar_url || devFinded.avatar_url,
      techs: techs ? parseArrayAsString(techs) : devFinded.techs,
      location: longitude || latitude ? location : devFinded.location,
    };
    const devUpdated = await Dev.findOneAndUpdate(query, doc, options);

    return res
      .status(devUpdated ? 200 : 400)
      .json(devUpdated || "Dev não encontrado.");
  } catch (err) {
    next(err);
  }
};

// DELETE /devs/:id
export const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const devDeleted = await Dev.findOneAndDelete({ _id: id });

    if (devDeleted) {
      return res.status(200).json(devDeleted);
    } else {
      return res.status(400).json({ message: "Dev não encontrado." });
    }
  } catch (err) {
    next(err);
  }
};

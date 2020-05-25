/* eslint-disable no-unused-vars */
import { Request, Response } from "express";
import { parseArrayAsString } from "../utils";
import { IRequestQuery } from "../types";
import Dev from "../models/dev.model";

// GET /search
export const index = async (req: Request, res: Response) => {
  try {
    const { latitude, longitude, techs }: IRequestQuery = req.query;

    if (!techs || !latitude || !longitude) {
      return res.json({ message: "Parâmetros em formato inválido." });
    }

    const techsArray = parseArrayAsString(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    });

    return res.json({ devs });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

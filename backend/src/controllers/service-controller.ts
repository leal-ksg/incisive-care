import { Request, Response } from "express";
import Service from "../models/service";

export const serviceController = {
  async findAll(req: Request, res: Response): Promise<any> {
    try {
      const services = await Service.find({});
      if (!services) return res.status(204).send();

      return res.json(services);
    } catch (err) {
      return res
        .status(500)
        .send({ error: `An error occurred on fetching services: ${err}` });
    }
  },

  async create(req: Request, res: Response): Promise<any> {
    try {
      const service = await Service.create(req.body);
      return res.json(service);
    } catch (err) {
      return res
        .status(500)
        .send({ error: `An error occurred on creating a service: ${err}` });
    }
  },
};

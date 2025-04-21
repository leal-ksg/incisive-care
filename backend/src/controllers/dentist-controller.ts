import { Request, Response } from "express";
import Dentist from "../models/dentist";

export const dentistController = {
  async findAll(req: Request, res: Response): Promise<any> {
    try {
      const dentists = await Dentist.find({});
      if (!dentists) return res.status(204).send();

      return res.json(dentists);
    } catch (err) {
      return res
        .status(500)
        .send({ error: `An error occurred on fetching dentists: ${err}` });
    }
  },

  async findOne(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      if (!id)
        return res.status(400).send({ error: "Provide an ID to be found" });

      const dentist = await Dentist.findById(id);
      if (!dentist) return res.status(204).send();

      return res.json(dentist);
    } catch (err) {
      return res
        .status(500)
        .send({ error: `An error occurred on finding a dentist: ${err}` });
    }
  },

  async create(req: Request, res: Response): Promise<any> {
    try {
      const dentist = await Dentist.create(req.body);
      return res.json(dentist);
    } catch (err) {
      return res
        .status(500)
        .send({ error: `An error occurred on registering a dentist: ${err}` });
    }
  },

  async update(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      if (!id)
        return res.status(400).send({ error: "Provide an ID for the update" });

      await Dentist.updateOne(
        {
          _id: id,
        },
        req.body,
        { strict: true }
      );

      return res.status(200).send();
    } catch (err) {
      return res.status(500).send({
        error: `An error occurred on updating the dentist info: ${err}`,
      });
    }
  },

  async delete(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      if (!id)
        return res.status(400).send({ error: "Provide the ID to be deleted" });

      await Dentist.deleteOne({
        _id: id,
      });

      return res.status(200).send();
    } catch (err) {
      return res.status(500).send({
        error: `An error occurred on deleting the dentist: ${err}`,
      });
    }
  },
};

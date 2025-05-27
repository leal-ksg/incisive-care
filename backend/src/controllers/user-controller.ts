import { Request, Response } from "express";
import { User } from "../models/user";

export const userController = {
  async findAll(req: Request, res: Response): Promise<any> {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (err) {
      return res
        .status(500)
        .send({ error: `An error occurred on fetching services: ${err}` });
    }
  },

  async findOne(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      if (!id)
        return res.status(400).send({ error: "Provide an ID to be found" });

      const user = await User.findByPk(id);
      if (!user) return res.status(204).send();

      return res.json(user);
    } catch (err) {
      return res
        .status(500)
        .send({ error: `An error occurred on finding a user: ${err}` });
    }
  },

  async create(req: Request, res: Response): Promise<any> {
    try {
      const service = await User.create(req.body);
      return res.json(service);
    } catch (err) {
      return res
        .status(500)
        .send({ error: `An error occurred on creating a user: ${err}` });
    }
  },

  async update(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      if (!id)
        return res.status(400).send({ error: "Provide an ID for the update" });

      await User.update(req.body, { where: { id } });

      return res.status(200).send({});
    } catch (err) {
      return res.status(500).send({
        error: `An error occurred on updating the user: ${err}`,
      });
    }
  },

  async delete(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      if (!id)
        return res.status(400).send({ error: "Provide the ID to be deleted" });

      await User.destroy({ where: { id } });

      return res.status(200).send({});
    } catch (err) {
      return res.status(500).send({
        error: `An error occurred on deleting the user: ${err}`,
      });
    }
  },
};

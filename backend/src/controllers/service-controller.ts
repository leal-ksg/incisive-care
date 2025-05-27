/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import Service from '../models/service';

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

  async findOne(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      if (!id)
        return res.status(400).send({ error: 'Provide an ID to be found' });

      const service = await Service.findById(id);
      if (!service) return res.status(204).send();

      return res.json(service);
    } catch (err) {
      return res
        .status(500)
        .send({ error: `An error occurred on finding a service: ${err}` });
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

  async update(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      if (!id)
        return res.status(400).send({ error: 'Provide an ID for the update' });

      await Service.updateOne(
        {
          _id: id,
        },
        req.body,
        { strict: true }
      );

      return res.status(200).send({});
    } catch (err) {
      return res.status(500).send({
        error: `An error occurred on updating the service: ${err}`,
      });
    }
  },

  async delete(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      if (!id)
        return res.status(400).send({ error: 'Provide the ID to be deleted' });

      await Service.deleteOne({
        _id: id,
      });

      return res.status(200).send({});
    } catch (err) {
      return res.status(500).send({
        error: `An error occurred on deleting the service: ${err}`,
      });
    }
  },
};

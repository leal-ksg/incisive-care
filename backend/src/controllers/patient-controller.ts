/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import Patient from '../models/patient';

export const patientController = {
  async findAll(req: Request, res: Response): Promise<any> {
    try {
      const patients = await Patient.find({});
      if (!patients) return res.status(204).send();

      return res.json(patients);
    } catch (err) {
      return res
        .status(500)
        .send({ error: `An error occurred on fetching patients: ${err}` });
    }
  },

  async findOne(req: Request, res: Response): Promise<any> {
    try {
      const { idType, id } = req.params;

      if (!id)
        return res.status(400).send({ error: 'Provide an ID to be found' });

      if (idType === 'id') {
        const patient = await Patient.findById(id);
        if (!patient) return res.status(204).send();

        return res.json(patient);
      } else if (idType === 'cpf') {
        const patient = await Patient.find({ cpf: id });
        if (!patient) return res.status(204).send();

        return res.json(patient);
      } else {
        return res.status(400).send();
      }
    } catch (err) {
      return res
        .status(500)
        .send({ error: `An error occurred on finding a patient: ${err}` });
    }
  },

  async create(req: Request, res: Response): Promise<any> {
    try {
      const patient = await Patient.create(req.body);
      return res.json(patient);
    } catch (err) {
      return res
        .status(500)
        .send({ error: `An error occurred on registering a patient: ${err}` });
    }
  },

  async update(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      if (!id)
        return res.status(400).send({ error: 'Provide an ID for the update' });

      await Patient.updateOne(
        {
          _id: id,
        },
        req.body,
        { strict: true }
      );

      return res.status(200).send();
    } catch (err) {
      return res.status(500).send({
        error: `An error occurred on updating the patient info: ${err}`,
      });
    }
  },

  async delete(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      if (!id)
        return res.status(400).send({ error: 'Provide the ID to be deleted' });

      await Patient.deleteOne({
        _id: id,
      });

      return res.status(200).send();
    } catch (err) {
      return res.status(500).send({
        error: `An error occurred on deleting the patient: ${err}`,
      });
    }
  },
};

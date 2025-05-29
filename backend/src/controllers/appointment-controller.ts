/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import Appointment from '../models/appointment';

export const appointmentController = {
  async findAll(req: Request, res: Response): Promise<any> {
    try {
      const appointments = await Appointment.find().populate([
        'services',
        'patient',
        'dentist',
      ]);
      if (!appointments) return res.status(204).send();

      return res.json(appointments);
    } catch (err) {
      return res
        .status(500)
        .send({ error: `An error occurred on finding appointments: ${err}` });
    }
  },

  async findOne(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      if (!id)
        return res.status(400).send({ error: 'Provide an ID to be found' });

      const appointment = await Appointment.findById(id).populate(['services']);
      if (!appointment) return res.status(204).send();

      return res.json(appointment);
    } catch (err) {
      return res
        .status(500)
        .send({ error: `An error occurred on finding an appointment: ${err}` });
    }
  },

  async getAppointmentsCount(req: Request, res: Response): Promise<any> {
    try {
      const count = await Appointment.aggregate([
        {
          $group: {
            _id: '$status',
            total: { $sum: 1 },
          },
        },
      ]);

      return res.status(200).json(count);
    } catch (err) {
      return res
        .status(500)
        .send({ error: `An error occurred on counting appointments: ${err}` });
    }
  },

  async create(req: Request, res: Response): Promise<any> {
    // TODO: ensure patient and dentist exists
    try {
      const appointment = await Appointment.create(req.body);
      return res.json(appointment);
    } catch (err) {
      return res.status(500).send({
        error: `An error occurred on creating an appointment: ${err}`,
      });
    }
  },

  async update(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      if (!id)
        return res.status(400).send({ error: 'Provide an ID for the update' });

      await Appointment.updateOne(
        {
          _id: id,
        },
        req.body,
        { strict: true }
      );

      return res.status(200).send();
    } catch (err) {
      return res.status(500).send({
        error: `An error occurred on updating the appointment: ${err}`,
      });
    }
  },

  async delete(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      if (!id)
        return res.status(400).send({ error: 'Provide the ID to be deleted' });

      await Appointment.findByIdAndUpdate(id, {
        status: 'CANCELLED',
      });

      return res.status(200).send();
    } catch (err) {
      return res.status(500).send({
        error: `An error occurred on deleting the appointment: ${err}`,
      });
    }
  },
};

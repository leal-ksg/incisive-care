import { Request, Response } from "express";
import Appointment from "../models/appointment";

export const AppointmentController = {
  async findAll(req: Request, res: Response): Promise<any> {
    try {
      const appointments = await Appointment.find({});
      if (!appointments) return res.status(204).send();

      return res.json(appointments);
    } catch (err) {
      return res
        .status(500)
        .send({ error: `An error occurred on finding appointments: ${err}` });
    }
  },
};
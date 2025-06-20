/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { AppointmentServicesDTO } from '../types';
import { AppointmentService, Service } from '../database/mysql/models';

export const appointmentServicesController = {
  async findAll(req: Request, res: Response): Promise<any> {
    try {
      const { appointmentId } = req.params;
      if (!appointmentId)
        return res
          .status(400)
          .send({ error: 'Provide an appointment to find its services' });

      const appointmentServices = await AppointmentService.findAll({
        where: {
          appointmentId,
        },
        include: [
          {
            model: Service,
          },
        ],
      });

      const services = appointmentServices.map(
        service => (service as any).Service
      );

      if (!services.length) return res.status(204).send();

      return res.json(services);
    } catch (err) {
      return res.status(500).send({
        error: `An error occurred on finding the appointment services: ${err}`,
      });
    }
  },

  async create(req: Request, res: Response): Promise<any> {
    const { appointmentId, services } = req.body as AppointmentServicesDTO;

    try {
      const dataToInsert = services.map(serviceId => ({
        appointmentId,
        serviceId,
      }));

      const createdServices = await AppointmentService.bulkCreate(dataToInsert);
      return res.json(createdServices);
    } catch (err) {
      return res.status(500).send({
        error: `An error occurred on creating the appointment services: ${err}`,
      });
    }
  },

  async update(req: Request, res: Response): Promise<any> {
    try {
      const { appointmentId, services } = req.body as AppointmentServicesDTO;
      if (!appointmentId)
        return res
          .status(400)
          .send({ error: 'Provide an appointment to update its services' });

      await AppointmentService.destroy({ where: { appointmentId } });

      const dataToInsert = services.map(serviceId => ({
        appointmentId,
        serviceId,
      }));
      await AppointmentService.bulkCreate(dataToInsert);

      return res.status(200).send({});
    } catch (err) {
      return res.status(500).send({
        error: `An error occurred on updating the appointment services: ${err}`,
      });
    }
  },

  async delete(req: Request, res: Response): Promise<any> {
    try {
      const { appointmentId } = req.params;
      if (!appointmentId)
        return res
          .status(400)
          .send({ error: 'Provide an appointment to delete its services' });

      await AppointmentService.destroy({
        where: { appointmentId },
      });

      return res.status(200).send({});
    } catch (err) {
      return res.status(500).send({
        error: `An error occurred on deleting the appointment services: ${err}`,
      });
    }
  },
};

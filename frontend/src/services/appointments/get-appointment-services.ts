import { isAxiosError } from 'axios';
import { Service } from '../../domains/types';
import { api } from '../api';

export const getAppointmentServices = async (
  appointmentId: string
): Promise<Service[]> => {
  try {
    const response = await api.get(`/appointment-services/${appointmentId}`);

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    return [];
  }
};

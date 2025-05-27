import { isAxiosError } from 'axios';
import { Appointment } from '../../domains/types';
import { api } from '../api';

export const getAppointments = async (): Promise<Appointment[]> => {
  try {
    const response = await api.get(`/appointments`);

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    return [];
  }
};

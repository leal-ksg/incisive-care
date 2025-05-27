import { isAxiosError } from 'axios';
import { AppointmentsCount } from '../../domains/types';
import { api } from '../api';

export const getAppointmentsCount = async (): Promise<AppointmentsCount[]> => {
  try {
    const response = await api.get(`/appointments/count`);

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    return [];
  }
};

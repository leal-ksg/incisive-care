import { isAxiosError } from 'axios';
import { Patient } from '../../domains/types';
import { api } from '../api';

export const getPatients = async (): Promise<Patient[]> => {
  try {
    const response = await api.get(`/patients`);

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    return [];
  }
};

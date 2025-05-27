import { isAxiosError } from 'axios';
import { Dentist } from '../../domains/types';
import { api } from '../api';

export const getDentists = async (): Promise<Dentist[]> => {
  try {
    const response = await api.get(`/dentists`);

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    return [];
  }
};

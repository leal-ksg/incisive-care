import { isAxiosError } from 'axios';
import { User } from '../../domains/types';
import { api } from '../api';

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get(`/users`);

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    return [];
  }
};

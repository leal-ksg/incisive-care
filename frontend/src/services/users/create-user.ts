import { isAxiosError } from 'axios';
import { api } from '../api';
import { errorToast, successToast } from '@/lib/toast-styles';
import { toast } from 'sonner';
import { UserFormData } from '@/domains/types';

export const createUser = async (user: UserFormData): Promise<boolean> => {
  try {
    await api.post(`/users/`, user);

    toast('Usuário cadastrado!', {
      duration: 3000,
      style: successToast,
    });

    return true;
  } catch (error) {
    if (isAxiosError(error)) {
      toast('Não foi possível cadastrar o usuário...', {
        duration: 3000,
        style: errorToast,
      });
    }

    return false;
  }
};

import { isAxiosError } from 'axios';
import { api } from '../api';
import { errorToast, successToast } from '@/lib/toast-styles';
import { toast } from 'sonner';

export const deleteUser = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`/users/${id}`);

    toast('Usuário excluído!', {
      duration: 3000,
      style: successToast,
    });

    return true;
  } catch (error) {
    if (isAxiosError(error)) {
      toast('Não foi possível excluir o usuário...', {
        duration: 3000,
        style: errorToast,
      });
    }

    return false;
  }
};

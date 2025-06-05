import { isAxiosError } from 'axios';
import { api } from '../api';
import { errorToast, successToast } from '@/lib/toast-styles';
import { toast } from 'sonner';
import { UserFormData } from '@/domains/types';

export const updateUser = async (
  user: UserFormData & { id: number }
): Promise<boolean> => {
  const { id, ...userWithoutId } = user;

  if (!userWithoutId.password) delete userWithoutId.password;

  try {
    await api.put(`/users/${id}`, userWithoutId);

    toast('Usuário atualizado!', {
      duration: 3000,
      style: successToast,
    });

    return true;
  } catch (error) {
    if (isAxiosError(error)) {
      toast('Não foi possível atualizar o usuário...', {
        duration: 3000,
        style: errorToast,
      });
    }

    return false;
  }
};

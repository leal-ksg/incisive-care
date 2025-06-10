import { isAxiosError } from 'axios';
import { api } from '../api';
import { errorToast, successToast } from '@/lib/toast-styles';
import { toast } from 'sonner';

export const deleteService = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`/services/${id}`);

    toast('Serviço excluído!', {
      duration: 3000,
      style: successToast,
    });

    return true;
  } catch (error) {
    if (isAxiosError(error)) {
      toast('Não foi possível excluir o serviço...', {
        duration: 3000,
        style: errorToast,
      });
    }

    return false;
  }
};

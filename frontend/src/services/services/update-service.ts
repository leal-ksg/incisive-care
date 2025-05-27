import { isAxiosError } from 'axios';
import { api } from '../api';
import { errorToast, successToast } from '@/lib/toast-styles';
import { toast } from 'sonner';
import { Service } from '@/domains/types';

export const updateService = async (service: Service): Promise<boolean> => {
  const { id, ...rest } = service;
  try {
    await api.put(`/services/${id}`, { ...rest });

    toast('Serviço atualizado!', {
      duration: 3000,
      style: successToast,
    });

    return true;
  } catch (error) {
    if (isAxiosError(error)) {
      toast('Não foi possível atualizar o serviço...', {
        duration: 3000,
        style: errorToast,
      });
    }

    return false;
  }
};

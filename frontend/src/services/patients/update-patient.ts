import { isAxiosError } from 'axios';
import { api } from '../api';
import { errorToast, successToast } from '@/lib/toast-styles';
import { toast } from 'sonner';
import { Patient } from '@/domains/types';

export const updatePatient = async (patient: Patient): Promise<boolean> => {
  const { id, ...rest } = patient;
  try {
    await api.put(`/patients/${id}`, { ...rest });

    toast('Paciente atualizado!', {
      duration: 3000,
      style: successToast,
    });

    return true;
  } catch (error) {
    if (isAxiosError(error)) {
      toast('Não foi possível atualizar o paciente...', {
        duration: 3000,
        style: errorToast,
      });
    }

    return false;
  }
};

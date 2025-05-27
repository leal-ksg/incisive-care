import { isAxiosError } from 'axios';
import { api } from '../api';
import { errorToast, successToast } from '@/lib/toast-styles';
import { toast } from 'sonner';
import { Patient } from '@/domains/types';

export const createPatient = async (
  patient: Omit<Patient, 'id'>
): Promise<boolean> => {
  try {
    await api.post(`/patients/`, patient);

    toast('Paciente cadastrado!', {
      duration: 3000,
      style: successToast,
    });

    return true;
  } catch (error) {
    if (isAxiosError(error)) {
      toast('Não foi possível cadastrar o paciente...', {
        duration: 3000,
        style: errorToast,
      });
    }

    return false;
  }
};

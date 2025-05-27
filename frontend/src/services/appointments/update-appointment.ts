import { isAxiosError } from 'axios';
import { api } from '../api';
import { errorToast, successToast } from '@/lib/toast-styles';
import { toast } from 'sonner';
import { AppointmentDTO } from '@/domains/types';

export const updateAppointment = async (
  id: string,
  appointment: AppointmentDTO
): Promise<boolean> => {
  try {
    await api.put(`/appointments/${id}`, appointment);

    toast('Agendamento atualizado!', {
      duration: 3000,
      style: successToast,
    });

    return true;
  } catch (error) {
    if (isAxiosError(error)) {
      toast('Não foi possível atualizar o agendamento...', {
        duration: 3000,
        style: errorToast,
      });
    }

    return false;
  }
};

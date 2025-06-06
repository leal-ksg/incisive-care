import { isAxiosError } from 'axios';
import { api } from '../api';
import { errorToast, successToast } from '@/lib/toast-styles';
import { toast } from 'sonner';
import { Appointment, AppointmentDTO } from '@/domains/types';

export const createAppointment = async (
  appointment: AppointmentDTO
): Promise<Appointment> => {
  try {
    const newAppointment: Appointment = await api.post(
      `/appointments/`,
      appointment
    );

    toast('Agendamento marcado!', {
      duration: 3000,
      style: successToast,
    });

    return newAppointment;
  } catch (error) {
    if (isAxiosError(error)) {
      toast('Não foi possível marcar o agendamento...', {
        duration: 3000,
        style: errorToast,
      });
    }

    return {} as Appointment;
  }
};

import { isAxiosError } from 'axios';
import { api } from '../api';
import { errorToast } from '@/lib/toast-styles';
import { toast } from 'sonner';
import { Service } from '@/domains/types';

export const createAppointmentAndServiceConnection = async (
  appointmentId: string,
  services: Service[]
): Promise<void> => {
  try {
    const dto = {
      appointmentId,
      services: services.map(service => service.id),
    };

    await api.post(`/appointment-services/`, dto);
  } catch (error) {
    if (isAxiosError(error)) {
      toast('Não foi possível vincular os serviços ao agendamento', {
        duration: 3000,
        style: errorToast,
      });
    }
  }
};

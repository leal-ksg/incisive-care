import { isAxiosError } from "axios";
import { api } from "../api";
import { errorToast, successToast } from "@/lib/toast-styles";
import { toast } from "sonner";

export const deleteAppointment = async (id: string): Promise<boolean> => {
  try {
    await api.delete(`/appointments/${id}`);

    toast("Agendamento cancelado!", {
      duration: 3000,
      style: successToast,
    });

    return true;
  } catch (error) {
    if (isAxiosError(error)) {
      toast("Não foi possível cancelar o agendamento...", {
        duration: 3000,
        style: errorToast,
      });
    }

    return false;
  }
};

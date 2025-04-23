import { isAxiosError } from "axios";
import { api } from "../api";
import { errorToast, successToast } from "@/lib/toast-styles";
import { toast } from "sonner";

export const deletePatient = async (id: string): Promise<boolean> => {
  try {
    await api.delete(`/patients/${id}`);

    toast("Paciente excluído!", {
      duration: 3000,
      style: successToast,
    });

    return true;
  } catch (error) {
    if (isAxiosError(error)) {
      toast("Não foi possível excluir o paciente...", {
        duration: 3000,
        style: errorToast,
      });
    }

    return false;
  }
};

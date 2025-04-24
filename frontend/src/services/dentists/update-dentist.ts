import { isAxiosError } from "axios";
import { api } from "../api";
import { errorToast, successToast } from "@/lib/toast-styles";
import { toast } from "sonner";
import { Dentist } from "@/domains/types";

export const updateDentist = async (dentist: Dentist): Promise<boolean> => {
  const { id, ...rest } = dentist;
  try {
    await api.put(`/dentists/${id}`, { ...rest });

    toast("Dentista atualizado!", {
      duration: 3000,
      style: successToast,
    });

    return true;
  } catch (error) {
    if (isAxiosError(error)) {
      toast("Não foi possível atualizar o dentista...", {
        duration: 3000,
        style: errorToast,
      });
    }

    return false;
  }
};

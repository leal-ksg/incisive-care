import { isAxiosError } from "axios";
import { api } from "../api";
import { errorToast, successToast } from "@/lib/toast-styles";
import { toast } from "sonner";
import { Dentist } from "@/domains/types";

export const createDentist = async (
  dentist: Omit<Dentist, "id">
): Promise<boolean> => {
  try {
    await api.post(`/dentists/`, dentist);

    toast("Dentista cadastrado!", {
      duration: 3000,
      style: successToast,
    });

    return true;
  } catch (error) {
    if (isAxiosError(error)) {
      toast("Não foi possível cadastrar o dentista...", {
        duration: 3000,
        style: errorToast,
      });
    }

    return false;
  }
};

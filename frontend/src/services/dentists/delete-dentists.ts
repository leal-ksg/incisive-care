import { isAxiosError } from "axios";
import { api } from "../api";
import { errorToast, successToast } from "@/lib/toast-styles";
import { toast } from "sonner";

export const deleteDentist = async (id: string): Promise<boolean> => {
  try {
    await api.delete(`/dentists/${id}`);

    toast("Dentista excluído!", {
      duration: 3000,
      style: successToast,
    });

    return true;
  } catch (error) {
    if (isAxiosError(error)) {
      toast("Não foi possível excluir o dentista...", {
        duration: 3000,
        style: errorToast,
      });
    }

    return false;
  }
};

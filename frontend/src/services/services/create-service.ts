import { isAxiosError } from "axios";
import { api } from "../api";
import { errorToast, successToast } from "@/lib/toast-styles";
import { toast } from "sonner";
import { Service } from "@/domains/types";

export const createService = async (
  service: Omit<Service, "id">
): Promise<boolean> => {
  try {
    await api.post(`/services/`, service);

    toast("Serviço cadastrado!", {
      duration: 3000,
      style: successToast,
    });

    return true;
  } catch (error) {
    if (isAxiosError(error)) {
      toast("Não foi possível cadastrar o serviço...", {
        duration: 3000,
        style: errorToast,
      });
    }

    return false;
  }
};

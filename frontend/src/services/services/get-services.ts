import { isAxiosError } from "axios";
import { Service } from "../../domains/types";
import { api } from "../api";

export const getServices = async (): Promise<Service[]> => {
  try {
    const response = await api.get(`/services`);

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error);
    }

    return [];
  }
};

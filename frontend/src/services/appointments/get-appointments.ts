import { isAxiosError } from "axios";
import { Appointment } from "../../domains/types";
import { api } from "../api";

export const getAppointments = async (): Promise<Appointment[]> => {
  try {
    const response = await api.get(`/appointments`);

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error);
    }

    return [];
  }
};

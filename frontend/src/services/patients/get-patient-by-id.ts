import { isAxiosError } from "axios";
import { Patient } from "../../domains/types";
import { api } from "../api";

export const getPatientById = async (
  idType: "cpf" | "id",
  id: string
): Promise<Patient[]> => {
  try {
    const response = await api.get(`/patients/${idType}/${id}`);

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error);
    }

    return [{} as Patient];
  }
};

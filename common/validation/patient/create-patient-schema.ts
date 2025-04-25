import * as Yup from "yup";
import { createServiceSchema } from "../service/create-service-schema";

export const createPatientSchema = Yup.object().shape({
  name: Yup.string().required("Informe o nome"),
  cpf: Yup.string()
    .required("Informe o CPF")
    .test("validate CPF", "Informe um cpf válido", (cpf) => {
      return /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/.test(cpf);
    }),
  dateOfBirth: Yup.date()
    .required("Informe a data de nascimento do paciente")
    .test(
      "date is earlier than or equal today",
      "A data não pode ser posterior a hoje",
      (date) => {
        const today = new Date();
        return date <= today;
      }
    ),
  phone: Yup.string()
    .required("Informe o número de telefone")
    .test(
      "validate phone number",
      "O telefone deve ter o formato (00) 00000-0000",
      (number) => {
        return /^\(\d{2}\)\s9\d{4}-\d{4}$/.test(number);
      }
    ),
});

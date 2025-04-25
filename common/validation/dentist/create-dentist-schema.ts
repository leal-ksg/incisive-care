import * as Yup from "yup";
import { createServiceSchema } from "../service/create-service-schema";

export const createDentistSchema = Yup.object().shape({
  name: Yup.string().required("Informe o nome"),
  cpf: Yup.string()
    .required("Informe o CPF")
    .test("validate CPF", "Informe um CPF válido", (cpf) => {
      return /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/.test(cpf);
    }),
  license: Yup.string()
    .required("Informe o CRO do dentista")
    .test("validateLicense", "Informe um CRO válido, no formato XX-12345", (license) => {
      return /^[A-Z]{2}-\d{1,6}$/.test(license);
    }),
  phone: Yup.string()
    .required("Informe o número de telefone")
    .test(
      "validate phone number",
      "O número deve ter o formato (00) 00000-0000",
      (number) => {
        return /^\(\d{2}\)\s9\d{4}-\d{4}$/.test(number);
      }
    ),
});

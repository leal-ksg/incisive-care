import * as Yup from "yup";
import { createServiceSchema } from "../service/create-service-schema";

export const createDentistSchema = Yup.object().shape({
  name: Yup.string().required("Enter a name"),
  cpf: Yup.string()
    .required("Enter the CPF")
    .test("validate CPF", "Enter a valid CPF", (cpf) => {
      return /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/.test(cpf);
    }),
  license: Yup.string()
    .required("Enter the license number")
    .test("validateLicense", "Enter a valid license", (license) => {
      return /^[A-Z]{2}-\d{1,6}$/.test(license);
    }),
  phone: Yup.string()
    .required("Enter the phone number")
    .test(
      "validate phone number",
      "Enter a phone number in the format (00) 00000-0000",
      (number) => {
        return /^\(\d{2}\)\s9\d{4}-\d{4}$/.test(number);
      }
    ),
});

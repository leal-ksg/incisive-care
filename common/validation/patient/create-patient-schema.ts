import * as Yup from "yup";
import { createServiceSchema } from "../service/create-service-schema";

export const createPatientSchema = Yup.object().shape({
  name: Yup.string().required("Enter a name"),
  cpf: Yup.string()
    .required("Enter the CPF")
    .test("validate CPF", "Enter a valid CPF", (cpf) => {
      return /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/.test(cpf);
    }),
  dateOfBirth: Yup.date()
    .required("Enter the patient's date of birth")
    .test(
      "date is earlier than or equal today",
      "The date can't be greater than today",
      (date) => {
        const today = new Date();
        return date <= today;
      }
    ),
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

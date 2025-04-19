import * as Yup from "yup";
import { createServiceSchema } from "../service/createServiceSchema";

export const createAppointmentSchema = Yup.object().shape({
  patientCPF: Yup.string()
    .required("Enter the CPF")
    .test("validate CPF", "Enter a valid CPF", (cpf) => {
      return /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/.test(cpf);
    }),
  dentistLicense: Yup.string()
    .required("Enter the CPF")
    .test("validateLicense", "Enter a valid license", (license) => {
      return /^[A-Z]{2}-\d{1,6}$/.test(license);
    }),
  date: Yup.date()
    .required("Enter the appointment date")
    .test(
      "date greater than or equal today",
      "The date can't be earlier than today",
      (date) => {
        if (!date) return false;

        const today = new Date();
        return date >= today;
      }
    ),
  services: Yup.array()
    .of(Yup.string().required("Select a service"))
    .min(1, "Include at least one service")
    .required("Include at least one services"),
});

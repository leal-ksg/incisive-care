import * as Yup from "yup";
import { createServiceSchema } from "../service/create-service-schema";

export const createAppointmentSchema = Yup.object().shape({
  patient: Yup.string().required("Enter the patient ID"),
  dentist: Yup.string().required("Enter the dentist ID"),
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
    .required("Include at least one service"),
});

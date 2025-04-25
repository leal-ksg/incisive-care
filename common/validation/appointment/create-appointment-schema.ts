import * as Yup from "yup";
import { createServiceSchema } from "../service/create-service-schema";

export const createAppointmentSchema = Yup.object().shape({
  patient: Yup.string().required("Informe o paciente"),
  dentist: Yup.string().required("Informe o dentista"),
  date: Yup.date()
    .required("Informe a data do agendamento")
    .test(
      "date greater than or equal today",
      "A data não pode ser anterior a hoje",
      (date) => {
        if (!date) return false;

        const today = new Date();
        return date >= today;
      }
    ),
  services: Yup.array()
    .of(Yup.string().required("Selecione um serviço"))
    .min(1, "Selecione pelo menos um serviço")
    .required("Selecione pelo menos um serviço"),
});

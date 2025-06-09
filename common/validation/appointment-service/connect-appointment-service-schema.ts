import * as Yup from "yup";
import { createServiceSchema } from "../service/create-service-schema";

export const connectAppointmentServiceSchema = Yup.object().shape({
  appointmentId: Yup.string().required("Informe o id do agendamento"),
  services: Yup.array()
    .of(Yup.string().required("Selecione um serviço"))
    .min(1, "Selecione pelo menos um serviço")
    .required("Selecione pelo menos um serviço"),
});

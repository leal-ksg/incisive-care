import * as Yup from "yup";

export const createServiceSchema = Yup.object().shape({
  description: Yup.string().required("Informe uma descrição"),
  category: Yup.string().required("Informe a categoria"),
  duration: Yup.number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("Informe a duração do serviço")
    .positive("A duração deve ser um número positivo"),
  unitAmount: Yup.number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("Informe o preço unitário")
    .positive("O preço dever ser positivo"),
});

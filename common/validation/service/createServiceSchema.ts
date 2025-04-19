import * as Yup from "yup";

export const createServiceSchema = Yup.object().shape({
  description: Yup.string().required("Enter a description"),
  category: Yup.string().required("Enter a category"),
  duration: Yup.number()
    .required("Enter a service duration")
    .positive("Duration must be positive"),
  unitAmount: Yup.number()
    .required("Enter a unit amount")
    .positive("Unit amount must be positive"),
});
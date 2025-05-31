import * as Yup from "yup";

export const createUserSchema = Yup.object().shape({
  name: Yup.string().required("Informe o nome do usuário"),
  email: Yup.string()
    .required("Informe o e-mail")
    .test("validate e-mail", "E-mail inválido", (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }),
  password: Yup.string().required("Informe a senha"),
  role: Yup.string()
    .required("Informe a role")
    .oneOf(["admin", "dentist"], "Role inválida"),
});

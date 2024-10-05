import * as yup from "yup"

export const signInSchema = yup.object().shape({
    email: yup
    .string()
    .email("Пожалуйста укажите корректный e-mail")
    .required("Необходимо указать email"),
    password: yup
    .string()
    .min(6, "Пароль должен состоять не менее, чем из 6 символов")
    .max(12, "Пароль должен состоять не более, чем из 12 символов")
    .required("Необходимо указать пароль"),
    confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Пароль не совпадает")
    .required("Необходимо подтвердить пароль"),
})

export interface SignInForm {
    email: string;
    password: string;
    confirmPassword: string;
}
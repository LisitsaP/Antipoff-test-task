import { useForm } from "react-hook-form"
import { signInClasses } from "./SignInClasses"
import { SignInForm, signInSchema } from "../../models/Form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../../firebase"
import { setDoc, doc } from "firebase/firestore"
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook"
import { login } from "../../features/authSlice"
import { useNavigate } from "react-router-dom"

export const SignIn = () => {
    const [authType, setAuthType] = useState<"login" | "sign-up">("login")
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<null | string>(null)
    const [visible, setVisible] = useState(false)
    const { user } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user, navigate])

    const { button, input, link } = signInClasses

    const handleFormSubmit = async (data: SignInForm) => {
        setErrorMessage(null)
        setLoading(true)
        const { email, password } = data
        if (authType === "sign-up") {
            try {
                const { user } = await createUserWithEmailAndPassword(auth, email, password)
                console.log(user)
                await setDoc(doc(db, "users", user.uid), { email })
                setLoading(false)
                if (user && user.email) dispatch(login({ email: user.email, id: user.uid }))
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                setLoading(false)
                const errorCode = error.code
                setErrorMessage(errorCode)
            }
        } else if (authType === "login") {
            try {
                const { user } = await signInWithEmailAndPassword(auth, email, password)
                setLoading(false)
                if (user && user.email) dispatch(login({ email: user.email, id: user.uid }))
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                setLoading(false)
                const errorCode = error.code
                setErrorMessage(errorCode)
            }
        }
    }

    const handleAuthType = () => {
        setAuthType((prevAuthType) =>
            prevAuthType === "login" ? "sign-up" : "login"
        )
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignInForm>({
        resolver: yupResolver(signInSchema)
    })

    

    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="w-[400px] md:w-[500px] br-[16px] flex flex-col shadow-md p-[16px] rounded-2xl"
            >
                {errorMessage && (
                    <p className="text-red py-2 text-left text-xs">
                        Пользователь с данным email адресом уже зарегистрирован. Неверный адрес или пароль.
                    </p>
                )}
                <div className="grid gap-y-3">
                    {authType === "login" ? (
                        <h1 className="text-lg font-roboto">Войти</h1>
                    ) : (
                        <h1 className="text-lg">Регистрация</h1>
                    )}
                    {authType !== "login" && (
                        <label className="gap-b-2">
                            <span className="text-black text-base">Имя</span>
                            <input
                                type="text"
                                placeholder="Ваше имя"
                                className={`${input} rounded-lg`}
                            />
                        </label>
                    )}
                    <label className="gap-b-2">
                        <span className="text-black text-base font-roboto">
                            Электронная почта
                        </span>
                        <input
                            type="email"
                            placeholder="email@example.com"
                            {...register("email")}
                            className={`${input} ${errors.email ? "border border-red" : ""}`}
                        />
                        {errors.email && (
                            <span className="text-red text-xs text-left">
                                {errors.email.message}
                            </span>
                        )}
                    </label>
                    <label className="gap-b-2">
                        <span className="text-black text-base font-roboto">Пароль</span>
                        <div
                            className={`${input} flex justify-between items-center ${
                                errors.confirmPassword ? "border border-red" : ""
                            }`}
                        >
                            <input
                                id="passwsword"
                                type={visible ? "text" : "password"}
                                placeholder="******"
                                {...register("password")}
                                className="bg-transparent text-black focus:outline-none placeholder:text-gray"
                            />
                            <div onClick={() => setVisible(!visible)}>
                                {visible ? (
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12 3C4 3 0 12.0415 0 12.0415C0 12.0415 4 21 12 21C20 21 24 12 24 12C24 12 20 3 12 3ZM12 19C6.7135 19 3.37575 14.0295 2.25075 12.037C3.375 10.0255 6.7135 5 12 5C17.2875 5 20.6255 9.9995 21.7495 12C20.6235 14.004 17.2863 19 12 19ZM12 8C9.791 8 8 9.791 8 12C8 14.2092 9.791 16 12 16C14.2092 16 16 14.2092 16 12C16 9.791 14.2092 8 12 8ZM12 14C10.8973 14 10 13.1027 10 12C10 10.8973 10.8973 10 12 10C13.1027 10 14 10.8973 14 12C14 13.1027 13.1027 14 12 14Z"
                                            fill="#808185"
                                            fill-opacity="0.52"
                                        />
                                        <path
                                            d="M12 3C4 3 0 12.0415 0 12.0415C0 12.0415 4 21 12 21C20 21 24 12 24 12C24 12 20 3 12 3ZM12 19C6.7135 19 3.37575 14.0295 2.25075 12.037C3.375 10.0255 6.7135 5 12 5C17.2875 5 20.6255 9.9995 21.7495 12C20.6235 14.004 17.2863 19 12 19ZM12 8C9.791 8 8 9.791 8 12C8 14.2092 9.791 16 12 16C14.2092 16 16 14.2092 16 12C16 9.791 14.2092 8 12 8ZM12 14C10.8973 14 10 13.1027 10 12C10 10.8973 10.8973 10 12 10C13.1027 10 14 10.8973 14 12C14 13.1027 13.1027 14 12 14Z"
                                            fill="#808185"
                                            fill-opacity="0.52"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M10.7302 5.07319C11.1448 5.02485 11.5684 5 11.9999 5C16.6639 5 20.3998 7.90264 21.9999 12C21.6053 13.0104 21.0809 13.9482 20.4446 14.7877M6.51956 6.51944C4.47949 7.76406 2.90105 9.69259 1.99994 12C3.60008 16.0974 7.33597 19 11.9999 19C14.0375 19 15.8979 18.446 17.4805 17.4804M9.87871 9.87859C9.33576 10.4215 8.99994 11.1715 8.99994 12C8.99994 13.6569 10.3431 15 11.9999 15C12.8284 15 13.5785 14.6642 14.1214 14.1212"
                                            stroke="#808185"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M4 4L20 20"
                                            stroke="#808185"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                        />
                                    </svg>
                                )}
                            </div>
                        </div>
                        {errors.password && (
                            <span className="text-red text-xs">{errors.password.message}</span>
                        )}
                    </label>
                    <label className="gap-b-2">
                        <span className="text-black text-base">
                            {authType === "login" ? "Продублируйте пароль" : "Подтвердите пароль"}
                        </span>
                        <div
                            className={`${input} flex justify-between items-center ${
                                errors.confirmPassword ? "border border-red" : ""
                            }`}
                        >
                            <input
                                id="passwsword"
                                type={visible ? "text" : "password"}
                                placeholder="******"
                                {...register("confirmPassword")}
                                className="bg-transparent text-black focus:outline-none placeholder:text-gray"
                            />
                            <div onClick={() => setVisible(!visible)}>
                                {visible ? (
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12 3C4 3 0 12.0415 0 12.0415C0 12.0415 4 21 12 21C20 21 24 12 24 12C24 12 20 3 12 3ZM12 19C6.7135 19 3.37575 14.0295 2.25075 12.037C3.375 10.0255 6.7135 5 12 5C17.2875 5 20.6255 9.9995 21.7495 12C20.6235 14.004 17.2863 19 12 19ZM12 8C9.791 8 8 9.791 8 12C8 14.2092 9.791 16 12 16C14.2092 16 16 14.2092 16 12C16 9.791 14.2092 8 12 8ZM12 14C10.8973 14 10 13.1027 10 12C10 10.8973 10.8973 10 12 10C13.1027 10 14 10.8973 14 12C14 13.1027 13.1027 14 12 14Z"
                                            fill="#808185"
                                            fill-opacity="0.52"
                                        />
                                        <path
                                            d="M12 3C4 3 0 12.0415 0 12.0415C0 12.0415 4 21 12 21C20 21 24 12 24 12C24 12 20 3 12 3ZM12 19C6.7135 19 3.37575 14.0295 2.25075 12.037C3.375 10.0255 6.7135 5 12 5C17.2875 5 20.6255 9.9995 21.7495 12C20.6235 14.004 17.2863 19 12 19ZM12 8C9.791 8 8 9.791 8 12C8 14.2092 9.791 16 12 16C14.2092 16 16 14.2092 16 12C16 9.791 14.2092 8 12 8ZM12 14C10.8973 14 10 13.1027 10 12C10 10.8973 10.8973 10 12 10C13.1027 10 14 10.8973 14 12C14 13.1027 13.1027 14 12 14Z"
                                            fill="#808185"
                                            fill-opacity="0.52"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M10.7302 5.07319C11.1448 5.02485 11.5684 5 11.9999 5C16.6639 5 20.3998 7.90264 21.9999 12C21.6053 13.0104 21.0809 13.9482 20.4446 14.7877M6.51956 6.51944C4.47949 7.76406 2.90105 9.69259 1.99994 12C3.60008 16.0974 7.33597 19 11.9999 19C14.0375 19 15.8979 18.446 17.4805 17.4804M9.87871 9.87859C9.33576 10.4215 8.99994 11.1715 8.99994 12C8.99994 13.6569 10.3431 15 11.9999 15C12.8284 15 13.5785 14.6642 14.1214 14.1212"
                                            stroke="#808185"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M4 4L20 20"
                                            stroke="#808185"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                        />
                                    </svg>
                                )}
                            </div>
                        </div>
                        {errors.confirmPassword && (
                            <span className="text-red text-xs text-left">
                                {errors.confirmPassword.message}
                            </span>
                        )}
                    </label>
                    {authType === "login" ? (
                        <button disabled={loading} className={button}>
                            Войти
                        </button>
                    ) : (
                        <button className={button}>Зарегистрироваться</button>
                    )}
                </div>
                <div className="text-sm font-light pt-4 place-content-start">
                    {authType === "login" ? (
                        <span className="text-sm font-roboto text-black">
                            Еще нет аккаунта?{" "}
                            <span onClick={handleAuthType} className={link}>
                                Регистрация
                            </span>
                        </span>
                    ) : (
                        <span className="text-sm font-roboto text-black">
                            Уже есть аккаунт?{" "}
                            <span onClick={handleAuthType} className={link}>
                                Войти
                            </span>
                        </span>
                    )}
                </div>
            </form>
        </div>
    )
}

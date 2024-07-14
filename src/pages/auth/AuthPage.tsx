import React from 'react';
import {Button, Input, Link} from "@nextui-org/react";
import {useFormik} from "formik";
import {IAuthRequest} from "../../features/auth/types.tsx";
import AuthApi from "../../features/auth/api/AuthApi.ts";
import {AuthUserActionType, IAuthUser, IUser} from "../../store/types.ts";
import * as Yup from "yup";
import {jwtDecode} from "jwt-decode";
import {useDispatch} from "react-redux";
import {api, apiForm} from "../../utils/axios.ts";
import ReCAPTCHA from "react-google-recaptcha";

const AuthPage = () => {
    const dispatch = useDispatch();
    const recaptchaRef = React.useRef();

    const onSubmitWithReCAPTCHA = async (e) => {
        e.preventDefault();
        const token = await recaptchaRef.current.executeAsync();
        formik.submitForm();
        // apply to form data
    }
    const SignupSchema = Yup.object().shape({
        email: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .email("Bad format")
            .required('Required'),
        password: Yup.string()
            .min(6, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
    });

    const initialValues: IAuthRequest = {
        email: "",
        password: ""
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: SignupSchema,
        onSubmit: values => {
            AuthApi.login(values).then(response => {
                const token = response.data.token;

                const user = jwtDecode(token) as IUser;
                console.log(user);
                dispatch({
                    type: AuthUserActionType.LOGIN_USER, payload: user
                });

                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                apiForm.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                localStorage.setItem("token", token);

            }).catch(reason => {
                console.log(reason);
            })
        },
    });

    return (
        <form onSubmit={onSubmitWithReCAPTCHA}>
            <div className={"flex flex-col gap-[15px] p-[5px]"}>
                <h1 className={"font-bold text-[30px]"}>Login</h1>
                <Input value={formik.values.email} onChange={formik.handleChange} isInvalid={formik.errors.email != null} errorMessage={formik.errors.email} type="email" name={"email"} label="Email" placeholder="Enter your email"/>
                <Input value={formik.values.password} onChange={formik.handleChange} isInvalid={formik.errors.password != null} errorMessage={formik.errors.password} type="password" name={"password"} label="Password" placeholder="Enter your password"/>
                <ReCAPTCHA
                    ref={recaptchaRef}
                    size="normal"

                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"

                />
                <Button type="submit" className={"font-bold"} color={"success"}>Login</Button>
                <div className={"w-full flex justify-center"}>
                    <Link  href={"/auth/signup"} className={"font-bold text-[14px]"}>Sign Up</Link>
                </div>
            </div>

        </form>
    );
};

export default AuthPage;
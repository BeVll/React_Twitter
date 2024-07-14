import React, {useRef} from 'react';
import {useDispatch} from "react-redux";
import * as Yup from "yup";
import {IAuthRequest, ISignupRequest} from "../../features/auth/types.tsx";
import {useFormik} from "formik";
import AuthApi from "../../features/auth/api/AuthApi.ts";
import {jwtDecode} from "jwt-decode";
import {AuthUserActionType, IUser} from "../../store/types.ts";
import {api, apiForm} from "../../utils/axios.ts";
import {Button, Input, Link, Image} from "@nextui-org/react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const SignupPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const imageInputRef = useRef(null);
    const headerInputRef = useRef(null);

    const handleFileClick = () => {
        imageInputRef.current.click(); // Trigger file input click when custom icon is clicked
    };

    const handleHeaderClick = () => {
        headerInputRef.current.click(); // Trigger file input click when custom icon is clicked
    };

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .email("Bad format")
            .required('Required'),
        password: Yup.string()
            .min(6, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Required'),
        image: Yup.mixed().nullable(),
        backgroundImage: Yup.mixed().nullable()
    });

    const initialValues: ISignupRequest = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        image: null,
        backgroundImage: null,
        country: "",
        countryCode: ""
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: SignupSchema,
        onSubmit: values => {
            axios.get('https://api.geoapify.com/v1/ipinfo?apiKey=d74e417fb77f459daa5e229304c08a0e')
                .then(async (response) => {
                    const country = response.data.country;
                    console.log('User Country:', country);
                    await formik.setFieldValue("country", country.name);
                    await formik.setFieldValue("countryCode", country.iso_code);
                    AuthApi.register(values).then(response => {
                        const token = response.data.token;

                        const user = jwtDecode(token) as IUser;
                        console.log(user);
                        dispatch({
                            type: AuthUserActionType.LOGIN_USER, payload: user
                        });

                        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                        apiForm.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                        localStorage.setItem("token", token);
                        navigate("/login");
                    }).catch(reason => {
                        console.log(reason);
                    })

                });
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={"flex flex-col gap-[15px] p-[10px]"}>
                <h1 className={"font-bold text-[30px]"}>Sign up</h1>

                <Input
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.name != null}
                    errorMessage={formik.errors.name}
                    type="text"
                    name={"name"}
                    placeholder="Enter your name"/>

                <Input
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.email != null}
                    errorMessage={formik.errors.email}
                    type="email"
                    name={"email"}
                    placeholder="Enter your email"/>

                <Input
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.password != null}
                    errorMessage={formik.errors.password}
                    type="password"
                    name={"password"}
                    placeholder="Enter your password"/>

                <Input
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.confirmPassword != null}
                    errorMessage={formik.errors.confirmPassword}
                    type="password"
                    name={"confirmPassword"}
                    placeholder="Confirm your password"/>

                <div className={"flex gap-[15px]"}>
                    <div
                        onClick={handleFileClick}
                        className={'bg-content2 overflow-hidden flex justify-center items-center min-h-[150px] min-w-[150px] w-[150px] rounded-[10px] shadow text-border hover:opacity-60 cursor-pointer transition'}
                        // Attach click handler to custom icon
                    >
                        {formik.values.image ? (

                            <div className={"flex flex-col gap-[5px]"}>
                                <Image
                                    src={URL.createObjectURL(formik.values.image)}
                                    className={"h-[150px] w-[150px] object-cover rounded-[10px]"}
                                    alt={formik.values.image.name}
                                    height={150}
                                    width={150}
                                />
                            </div>

                        ) : (
                            <h1>Avatar</h1>
                        )}
                        <input
                            ref={imageInputRef} // Assign ref to file input
                            type="file"
                            name={"image"}

                            onChange={(event) => {
                                formik.setFieldValue("image", event.target.files[0]);
                            }}
                            style={{display: 'none'}}
                            accept="image/png, image/jpg, image/webp, image/jpeg" // Add accepted file types
                        />

                    </div>


                    <div
                        onClick={handleHeaderClick}
                        className={'bg-content2 overflow-hidden flex justify-center items-center min-h-[150px] min-w-[300px] w-[300px] rounded-[10px] shadow text-border hover:opacity-60 cursor-pointer transition'}
                        // Attach click handler to custom icon
                    >
                        {formik.values.backgroundImage ? (

                            <div className={"flex flex-col gap-[5px]"}>
                                <Image
                                    src={URL.createObjectURL(formik.values.backgroundImage)}
                                    className={"h-[150px] w-[300px] object-cover rounded-[10px]"}
                                    alt={formik.values.backgroundImage.name}
                                    height={150}
                                    width={300}
                                />
                            </div>

                        ) : (
                            <h1>Header</h1>
                        )}
                        <input
                            ref={headerInputRef} // Assign ref to file input
                            type="file"
                            name={"backgroundImage"}

                            onChange={(event) => {
                                formik.setFieldValue("backgroundImage", event.target.files[0]);
                            }}
                            style={{display: 'none'}}
                            accept="image/png, image/jpg, image/webp, image/jpeg" // Add accepted file types
                        />

                    </div>
                </div>

                <Button
                    type="submit"
                    className={"font-bold"}
                    color={"success"}>
                    Sign Up
                </Button>
                <div className={"w-full flex justify-center"}>
                    <Link href={"/auth/login"} className={"font-bold text-[14px]"}>Login</Link>
                </div>
            </div>
        </form>
    );
};

export default SignupPage;
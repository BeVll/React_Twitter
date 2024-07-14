import {apiForm} from "../../../utils/axios.ts";
import {IAuthLogin, IAuthRequest, ISignupRequest} from "../types.tsx";

const AuthApi = {
    login: async function (values: IAuthRequest) {
        return await apiForm.post<IAuthLogin>(`/auth/login`, values);
    },
    register: async function (values: ISignupRequest) {
        return await apiForm.post(`/auth/create`, values);
    },
}

export default AuthApi;
import {api, apiForm} from "../../../utils/axios.ts";
import {IAuthLogin, IAuthRequest, ISignupRequest} from "../types.tsx";
import {IUserDetailed} from "../types.ts";

const UserApi = {
    getUserDetailed: async function (id:string|number) {
        return await api.get<IUserDetailed>(`/auth/${id}`);
    },
    follow: async function (id:string|number) {
        return await api.post(`/follow/${id}`);
    },
}

export default UserApi;
import {api, apiForm} from "../../../utils/axios.ts";
import {IAuthLogin, IAuthRequest, ISignupRequest} from "../types.tsx";
import {ITweetView, IUserDetailed} from "../types.ts";

const TweetApi = {
    getPostsForUser: async function (profileId:string|number, forUserId:string|number) {
        return await api.get<ITweetView[]>(`/tweets/GetUserTweets?UserId=${forUserId}&UserPageId=${profileId}`);
    },
}

export default TweetApi;
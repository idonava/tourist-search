import { getCurrentUser,getUserHistory } from "../services/userApi";

export const getUser = async (state) => {
    const res = await getCurrentUser(state);
    if (!res.token) {
        // console.log('res',res)
        return res;
    }
    return null;
};
export const getHistory = async (state) => {
    const res = await getUserHistory(state);
    if (!res.token) {
        // console.log('res',res)
        return res;
    }
    return null;
};
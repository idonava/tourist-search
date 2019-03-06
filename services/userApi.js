import { post, get } from "../libs/request";
export const addSearchToUser = async (token,text,totalResults) => {
    try {
        const response = await post("/routing/add-search", JSON.stringify({token,text,totalResults}));
        return response;
    } catch (error) {
        return error.response && error.response.status === 422
            ? "Adding doesn't successed."
            : "Unknown error. Please try again";
    }
}
export const createUser = async (state) => {
    try {
        const response = await post("/routing/auth/signup", JSON.stringify(state));
        return response;
    } catch (error) {
        return error.response && error.response.status === 422
            ? "Email is already taken."
            : "Unknown error. Please try again";
    }
};

export const getCurrentUser = async (token) => {
    try {
        const res = await post("/routing/get-user", JSON.stringify({token}))
        return res;
    } catch (error) {
        return error.response && error.response.status === 404
            ? "User doesn't found"
            : "Unknown error. Please try again";
    }
};
export const getUserHistory = async (token) => {
    try {
        const res = await post("/routing/user-history", JSON.stringify({token}))
        return res;
    } catch (error) {
        return error.response && error.response.status === 404
            ? "Deleting history failed."
            : "Unknown error. Please try again";
    }
};
export const deleteUserHistory = async (token) => {
    try {
        const res = await post("/routing/delete-user-history", JSON.stringify({token}))
        return res;
    } catch (error) {
        return error.response && error.response.status === 404
            ? "User history not found"
            : "Unknown error. Please try again";
    }
};
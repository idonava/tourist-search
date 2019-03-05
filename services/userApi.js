import { post, get } from "../libs/request";
export const addSearchToUser = async (user,text,totalResults) => {
    console.log('addSearch',user,text)
    try {
        const response = await post("/routing/add-search", JSON.stringify({user,text,totalResults}));
        return response;
    } catch (error) {
        return error.response && error.response.status === 422
            ? "Adding doesnt successed."
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
        // console.log('error',error)
        return error.response && error.response.status === 404
            ? "User not found"
            : "Unknown error. Please try again";
    }
};

export const getUserHistory = async (token) => {
    try {

        const res = await post("/routing/user-history", JSON.stringify({token}))
        console.log('res',res)
        return res;

    } catch (error) {
        // console.log('error',error)
        return error.response && error.response.status === 404
            ? "User history not found"
            : "Unknown error. Please try again";
    }
};
export const deleteUserHistory = async (token) => {
    try {

        const res = await post("/routing/delete-user-history", JSON.stringify({token}))

        return res;

    } catch (error) {
        // console.log('error',error)
        return error.response && error.response.status === 404
            ? "User history not found"
            : "Unknown error. Please try again";
    }
};
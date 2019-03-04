import { post, get } from "../libs/request";
export const addSearchToUser = async (user,text) => {
    console.log(user,text)
    try {
        const response = await post("/routing/addsearch", JSON.stringify("user",text));
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
        const res = await post("/routing/getuser", '{"token":"2CcbSLtUZkNcVWd6a/GNUQ=="}')
        console.log('res',res);

        return res;

    } catch (error) {
        // console.log('error',error)
        return error.response && error.response.status === 404
            ? "User not found"
            : "Unknown error. Please try again";
    }
};

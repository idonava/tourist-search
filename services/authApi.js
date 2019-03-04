import { post } from "../libs/request";

export const authenticate = async (state) => {
  //console.log('authenticate',state)
  try {
    const res = await post("/routing/auth/signin",  JSON.stringify(state));
    return res.data;
  } catch (error) {
    return error.response && error.response.status === 404
      ? "Wrong email/password"
      : "Unknown error. Please try again";
  }
};

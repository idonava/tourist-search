import { setCookie, getCookie, removeCookie } from "./session";
import redirect from "./redirect";
import { authenticate } from "../services/authApi";
import { createUser } from "../services/userApi";

export const getToken = ctx => {
const cookie =  getCookie("token", ctx.req);
    return cookie;
};

export const isAuthenticated = ctx => !!getToken(ctx);

export const signIn = async (state) => {
    const res = await authenticate(state);
    if (!res.token) {
        return res;
    }
    setCookie("token", res.token);
    redirect("/flickr");
    return null;
};

export const signUp = async (state) => {
    const res = await createUser(state);
    if (!res.data.token) {
        return res;
    }
    setCookie("token", res.data.token);
    redirect("/flickr");
    return null;
};
export const redirectIfAuthenticated = ctx => {
    if (isAuthenticated(ctx)) {
        redirect("/flickr", ctx);
        return true;
    }
    
    return false;
};

export const redirectIfNotAuthenticated = ctx => {
    if (!isAuthenticated(ctx)) {
        redirect("/signin", ctx);
        return true;
    }
    return false;
}   
import { Component } from "react";
import { removeCookie } from "../libs/session";
import redirect from "../libs/redirect";
const signout = (token = {}) => {
    if (process.browser) {
        removeCookie("token");
        redirect("/signin", token);
    }
};
export default class SignOut extends Component {
    componentDidMount() {
        signout();
        return {};
    }
    render() {
        return null;
    }

}
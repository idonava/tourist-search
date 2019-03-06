import { Component } from "react";
import App from "../components/App";
import Title from '../components/Title'
import { signUp, redirectIfAuthenticated } from "../libs/auth";
const emailRegex = RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    return valid;
};
export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            formErrors: {
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            }
        };
    }
    static getInitialProps(ctx) {
        redirectIfAuthenticated(ctx);

        return {};
    }

    render() {
        const { formErrors } = this.state;
        const { url } = this.props;
        return (
            <App>
                <Title authenticated={false} pathname={url.pathname}></Title>
                <div className="wrapper Sign-page-content">
                    <div className="form-wrapper">
                        <h1>Create Account</h1>
                        <form onSubmit={this.handleSubmit} noValidate>
                            <div className="firstName">
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" className={formErrors.firstName.length > 0 ? "error" : null} placeholder="First Name" name="firstName" noValidate onChange={this.handleChange} />
                                {formErrors.firstName.length > 0 && (<span className="errorMessage">{formErrors.firstName}</span>)}
                            </div>
                            <div className="lastName">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" className={formErrors.lastName.length > 0 ? "error" : null} placeholder="Last Name" name="lastName" noValidate onChange={this.handleChange} />
                                {formErrors.lastName.length > 0 && (<span className="errorMessage">{formErrors.lastName}</span>)}
                            </div>
                            <div className="email">
                                <label htmlFor="email">Email</label>
                                <input type="email" className={formErrors.email.length > 0 ? "error" : null} placeholder="Email" name="email" noValidate onChange={this.handleChange} />
                                {formErrors.email.length > 0 && (<span className="errorMessage">{formErrors.email}</span>)}
                            </div>
                            <div className="password">
                                <label htmlFor="password">Password</label>
                                <input type="password" className={formErrors.password.length > 0 ? "error" : null} placeholder="Password" name="password" noValidate onChange={this.handleChange} />
                                {formErrors.password.length > 0 && (<span className="errorMessage">{formErrors.password}</span>)}
                            </div>
                            <div className="createAccount">
                                <button className="waves-effect grey darken-2 btn" type="submit">Create Account</button>
                            </div>
                        </form>
                    </div>
                </div>
            </App>
        );
    }
    handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        switch (name) {
          case 'firstName':
            formErrors.firstName = value.length < 2 ? 'minimum 2 characters required' : "";
            break;
          case 'lastName':
            formErrors.lastName = value.length < 2 ? 'minimum 2 characters required' : "";
            break;
          case 'email':
            formErrors.email = emailRegex.test(value) ? '' : 'invalid email address';
            break;
          case 'password':
            formErrors.password = value.length < 6 && value.length > 0 ? 'minimum 6 characters required' : "";
            break;
          default:
            break;
        }
        this.setState({ formErrors, [name]: value } )}
      handleSubmit =async e => {
        e.preventDefault();
    
        if (formValid(this.state)) {
            const error = await signUp(this.state);
            if (error) {
                this.setState({
                    error
                });
                return false;
            }
        
    
      };
    }}
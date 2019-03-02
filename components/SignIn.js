import React, { Component } from 'react'
import './css/SignUp.css'

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
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

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      formErrors: {
        email: "",
        password: ""
      }
    };
  }
  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;
    switch (name) {
      case 'email':
        formErrors.email = emailRegex.test(value) ? '' : 'invalid email address';
        break;
      case 'password':
        formErrors.password = value.length < 6 && value.length > 0 ? 'minimum 6 characters required' : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  }
  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
      fetch('/auth/signin', {
        method: 'post',
        body: JSON.stringify(this.state),
        headers: { 'content-type': 'application/json' }
      }).then(function (response) {
        console.log(response)
      });
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };
  render() {
    const { formErrors } = this.state;
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Login to Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
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
              <button type="submit">Login to Account</button>
              <small>Do not have an account?</small>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default SignIn
import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import "./Auth.css";
import Logo from "../Home/Logo";
import Logotext from "../Home/Logotext";
import ComingSoonGooglePlay from "../Home/ComingSoonGooglePlay";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      errorMessage: null,
      sendingEmail: false
    };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    axios
      .post("/api/signup", this.state)
      .then(response => {
        this.props.getUser(response.data);
        this.props.history.push("/how-to");
        this.sendsEmailConfirmation();
      })
      .catch(error => {
        if (error.response.status === 400) {
          this.setState({ errorMessage: error.response.data.message });
        } else {
          this.setState({
            errorMessage: "Unknown error, sorry 'bout that."
          });
        }
      });
  };

  sendsEmailConfirmation = () => {
    return axios
      .post("/email", { email: this.state.email })
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <>
        <main id="_main">
          <section id="_container">
            <section id="_left">
              <ComingSoonGooglePlay />
            </section>

            <section id="_right">

              <section id="_logo-auth">
                <Logo />
              </section>

              <section id="_logotext-auth">
                <Logotext />
              </section>

              <section id="_auth-form">

                <form onSubmit={this.handleFormSubmit}>

                  <section id="_form-fields">

                    <div className="form-label-group">
                      <input
                        type="text"
                        id="inputEmail"
                        className="form-control"
                        name="email"
                        onChange={e => this.handleChange(e)}
                        value={this.state.email}
                        required="required"
                        autoFocus
                      />
                      <label htmlFor="inputEmail">Email</label>
                    </div>

                    <div className="form-label-group">
                      <input
                        type="text"
                        id="inputEmail"
                        className="form-control"
                        name="username"
                        onChange={e => this.handleChange(e)}
                        value={this.state.username}
                        required="required"
                        autoFocus
                      />
                      <label htmlFor="inputEmail">Username</label>
                    </div>

                    <div className="form-label-group">

                      <input
                        type="password"
                        id="inputPassword"
                        className="form-control"
                        name="password"
                        label="Password"
                        onChange={e => this.handleChange(e)}
                        value={this.state.password}
                        required="required"
                      />
                      <label for="inputPassword">Password</label>

                    </div>

                    <p id="_error-message">
                      {""}
                      {this.state.errorMessage}
                    </p>

                  </section>

                  <button id="_submit-button" type="submit">Sign up</button>

                  <section id="_login-signup">
                    <strong>
                      (or log in <Link to="/login">here</Link>!)
                    </strong>
                  </section>

                </form>
              </section>
            </section>
          </section>
        </main>
      </>
    );
  }
}

export default withRouter(Signup);
import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import logo from '../Home/icons/finder-logo.png';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      errorMessage: null
    };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    axios
      .post("/api/signup", this.state)
      .then(response => {
        this.props.getUser(response.data);
        this.props.history.push("/home");
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

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row no-gutter">
            <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
            <div className="col-md-8 col-lg-6">
              <div className="login d-flex align-items-center py-5">
                <div className="container">
                  <div className="row">
                    <div className="col-md-9 col-lg-8 mx-auto">
                      <img className="logo-start" src={logo} alt="" />
                      <h3 className="login-heading mb-4">Welcome!</h3>
                      <div style={{ color: "red" }}>
                        {" "}
                        {this.state.errorMessage}
                      </div>
                      <form onSubmit={this.handleFormSubmit}>
                        
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
                            onChange={e => this.handleChange(e)}
                            value={this.state.password}
                            required="required"
                          />
                          <label htmlFor="inputPassword">Password</label>
                        </div>

                        <button id="btn-submit"
                          className="btn btn-lg btn-block btn-login text-uppercase font-weight-bold mb-2"
                          type="submit"
                        >
                          Sign up
                        </button>
                        <div className="text-center"></div>
                        <div class="text-center">
                        <span class="small"> Already have an account? </span>  <Link class="small" to="/login"> Log-in here</Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Signup);

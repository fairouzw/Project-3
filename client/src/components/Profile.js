import React, { Component } from "react";
// import UpdateProfile from "./UpdateProfile";
import axios from "axios";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // userData: this.props.userData,
      username: this.props.userData.username,
      email: this.props.userData.email
    };
  }

  handleFormSubmit = event => {
    // event.preventDefault(); I uncommented this so that it would refresh the page and update the userdate above.
    const { username, email } = this.state;

    axios
      .put(`/api/profiles/${this.props.userData._id}`, { username, email })
      .then(() => {
        // this.props.getUser();
        this.props.history.push("/profile");
      })
      .catch(error => console.log(error));
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <p> Welcome {this.props.userData.username} !</p>
        <p> Username: {this.props.userData.username}</p>
        <p> Email: {this.props.userData.email}</p>

        <form onSubmit={this.handleFormSubmit}>
          <div className="form-label-group">
            <input
              type="text"
              id="inputEmail"
              className="form-control"
              placeholder="Username"
              name="username"
              onChange={e => this.handleChange(e)}
              value={this.state.username}
              // required
              // autofocus
            />
            <label htmlFor="inputEmail">Username</label>
          </div>

          <div className="form-label-group">
            <input
              type="text"
              id="inputEmail"
              className="form-control"
              placeholder="Email"
              name="email"
              onChange={e => this.handleChange(e)}
              value={this.state.email}
              // required
              // autofocus
            />
            <label htmlFor="inputEmail">Email</label>
          </div>

          <button
            className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
            type="submit"
          >
            Update Details
          </button>
          <div className="text-center"></div>
        </form>
      </div>
    );
  }
}
export default Profile;

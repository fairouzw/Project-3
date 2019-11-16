import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Profile extends Component {
  logoutUser = () => {
    axios
      .post("/api/logout")
      .then(() => {
        this.props.getUser(null);
        this.props.history.push("/");
      })
      .catch(error => console.log(error));
  };
  render() {
    return (
      <div>
        <p> Welcome {this.props.userData.username} !</p>
        <p> Username: {this.props.userData.username}</p>

        <Link to="/">
          <button onClick={this.logoutUser}>Logout</button>
        </Link>
      </div>
    );
  }
}
export default Profile;

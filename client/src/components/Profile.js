import React, { Component } from "react";
import EditProfile from "./EditProfile";

class Profile extends Component {
  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <p> Welcome {this.props.userData.username} !</p>
        <p> Username: {this.props.userData.username}</p>
        {this.props.userData.email !== null ? (
          <p> E-mail: {this.props.userData.email}</p>
        ) : null}
        {this.props.userData.follows !== null ? (
          <p> Follows: {this.props.userData.follows}</p>
        ) : null}
        <EditProfile />
      </div>
    );
  }
}
export default Profile;

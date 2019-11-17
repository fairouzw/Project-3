import React, { Component } from "react";

import { Link } from "react-router-dom";

class Profile extends Component {
  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <p> Welcome {this.props.userData.username} !</p>
        <p> Username: {this.props.userData.username}</p>
      </div>
    );
  }
}
export default Profile;

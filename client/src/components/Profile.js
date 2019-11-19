import React, { Component } from "react";
import UpdateProfile from "./UpdateProfile";
import axios from 'axios';



class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // userData: this.props.userData,
      formVisible: false
    };
  }


  handleFormVisibility = () => {

    this.setState({
      formVisible: !this.state.formVisible
    })
  }


  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <p> Welcome {this.props.userData.username} !</p>
        <p> Username: {this.props.userData.username}</p>
        {this.props.userData.email !== null ? (
          <p> E-mail: {this.props.userData.email}</p> // how to set the value on  null??
        ) : null}
        {this.props.userData.follows !== null ? (
          <p> Follows: {this.props.userData.follows}</p>
        ) : null}
        {this.state.formVisible && <UpdateProfile getUser={this.state} />}
        {!this.state.formVisible && <button onClick={this.handleFormVisibility} className="button is-primary">Update Userdata</button>}

      </div>
    );
  }
}
export default Profile;

import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { notify } from "react-notify-toast";
import Spinner from "./Spinner";

class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirming: true,
    };
  }

  componentDidMount = () => {
    const { id } = this.props.match.params
    fetch(`/email/confirm/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ confirming: false })
        notify.show(data.msg)
      })
      .catch(err => console.log(err))
  };

  render() {
    return (
      <div className='confirm'>
        {this.state.confirming ? (
          <Spinner size="8x" spinning={"spinning"} />
        ) : (
          <Redirect to="/profile"/> 
        )}
      </div>
    );
  }
}

export default withRouter(Confirm);

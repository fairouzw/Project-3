import React, { Component } from "react";
import { Link } from "react-router-dom";

class DisplayPost extends Component {
  render() {
      return (
        <div>
          <p>{this.props.selectedPost.postname}</p>
          <img className="fav-pic" src={this.props.selectedPost.imgUrl} alt="" />
          <p>{this.props.selectedPost.address}</p>
          <div>
            <Link to={`/messages/new-message/${this.props.selectedPost.owner}`} ><p><span className="owner">or contact finder</span></p></Link>
          </div>
        </div>
      );
  }
}

export default DisplayPost;

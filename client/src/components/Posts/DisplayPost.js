import React, { Component } from "react";

class DisplayPost extends Component {
  render() {
    // if (this.props.selectedPost === null) {
    //   return null;
    // } else {
      return (
        <div>
          <p>{this.props.selectedPost.postname}</p>
          <img src={this.props.selectedPost.imgUrl} alt=""/>
          <p>{this.props.selectedPost.address}</p>
        </div>
      );
    // }
  }
}

export default DisplayPost;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardImg } from "reactstrap";
class DisplayPost extends Component {
  render() {
      return (
        <Card >
          <div className="one-post">
          <CardImg style={{height:"200px", objectFit: "contain"}} className="post-pic" src={this.props.selectedPost.imgUrl} alt="" />
          <p>{this.props.selectedPost.postname}</p>
          <p>{this.props.selectedPost.address}</p>
          <div>
            <Link to={`/messages/new-message/${this.props.selectedPost.owner}`} ><p><span className="owner">or contact finder</span></p></Link>
          </div>
        </div>
        </Card>
      );
  }
}

export default DisplayPost;

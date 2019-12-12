import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardHeader, CardFooter, Badge, CardBody, CardText, CardTitle, Input, InputGroupAddon, InputGroupText, InputGroup, Button } from "reactstrap";
import moment from "moment";

class DisplayPost extends Component {


  render() {
    var timeAgo = moment(this.props.selectedPost.createdAt).fromNow();
    return (
      <Card >
        <CardHeader>
          <div className="posted-by-container">
            <div className="posted-by-box">
              {/* posted by */}  <i id="btn-fg" className="ni ni-single-02" />
              <Link to={`/messages/new-message/${this.props.selectedPost.owner}`}>
                {" "}
                <span className="owner icon-text">
                  {this.props.selectedPost.owner.username}{" "}
                  <i id="btn-fg" className="ni ni-email-83 icon-message" />
                </span>{" "}
              </Link>
            </div>
          </div>
        </CardHeader>
        <div className="one-post">
          <CardImg style={{ height: "200px", objectFit: "contain" }} className="post-pic" src={this.props.selectedPost.imgUrl} alt="" />
          <CardBody style={{ textAlign: "center" }}>
            <CardTitle >{this.props.selectedPost.postname}</CardTitle>
            <CardText>{this.props.selectedPost.address}
              <p style={{ textAlign: "center" }}>
                {" "}
                Posted{" "}
                <span className="date timeago" title={timeAgo}>
                  {timeAgo}
                </span>{" "}
              </p>
            </CardText>
            {/* Comments map here */}
          </CardBody>
          {/* Add Comment */}
          <CardFooter style={{ textAlign: "center" }}>
            {this.props.selectedPost.tags.map(tag => {
              return (
                <Badge id="btn-badge" pill>
                  {tag}
                </Badge>
              );
            })}
          </CardFooter>
        </div>
      </Card>
    );
  }
}

export default DisplayPost;

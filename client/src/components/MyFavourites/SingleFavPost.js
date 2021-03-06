import React, { Component } from "react";
import { Link } from "react-router-dom";
import AddComment from "../Posts/AddComment";
import LikeButton from "../Posts/LikeButton";
import moment from "moment";
import axios from "axios";
import { Card, CardImg, CardTitle, CardHeader, CardText, CardBody, CardFooter, Badge } from "reactstrap";

class SingleFavPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: this.props.post,
      comments: this.props.post.comments
    };
  }

  addCommentHandler = newComment => {
    this.setState({
      comments: [...this.state.comments, newComment]
    });
  };

  toggleLike = event => {
    console.log(this.state.postId);
    const { post } = this.state;
    if (!this.state.post.hasLiked) {
      return axios
        .post(`/api/posts/${this.state.post._id}/like`, { post })
        .then(response => {
          this.setState({
            post: response.data
          });
        })
        .catch(error => console.log(error));
    } else {
      return axios
        .delete(`/api/posts/${this.state.post._id}/like`, { post })
        .then(response => {
          this.props.getAllPosts();
          this.setState({
            post: response.data
          });
        })
        .catch(error => console.log(error));
    }
  };

  render() {
    var timeAgo = moment(this.props.post.createdAt).fromNow();
    return (
      <Card>
        <CardHeader>
          <div className="posted-by-container">
            <div className="posted-by-box">
              {/* posted by */}  <i className="ni ni-single-02 text-blue" />
              <Link to={`/messages/new-message/${this.props.post.owner._id}`}>
                {" "}
                <span className="owner icon-text">
                  {this.props.post.owner.username}{" "}
                  <i className="ni ni-email-83 text-blue icon-message" />
                </span>{" "}
              </Link>
            </div>
          </div>
        </CardHeader>

        <div className="one-post">
          <CardImg
            style={{
              height: "250px",
              objectFit: "contain"
            }}
            className="post-pic"
            src={this.props.post.imgUrl}
            alt=""
          ></CardImg>
          <CardBody >
            <CardTitle style={{ textAlign: "center" }}>{this.props.post.postname}</CardTitle>
            <CardText style={{ textAlign: "center" }}>{this.props.description}
              <Link to={`/posts/${this.props.post._id}`}>
                <p id="btn-address">{this.props.post.address}</p>
              </Link>
              <p>
                {" "}
                Posted{" "}
                <span className="date timeago" title={timeAgo}>
                  {timeAgo}
                </span>{" "}
              </p>
              <LikeButton
                style={{ textAlign: "center" }}
                likeCounter={this.state.post.likes}
                toggleLike={this.toggleLike}
                post={this.state.post}
              />

              <hr />
            </CardText>
            <p>
              {this.state.comments.map((c, idx) => {
                return (
                  <div key={idx} className="owner">
                    {c.owner.username} <i className="far fa-comment"></i> :{" "}
                    <span className="comment"> {c.comment} </span>{" "}
                  </div>
                );
              })}
            </p>
          </CardBody>
          <AddComment
            addComment={this.addCommentHandler}
            post={this.state.post}
          />
          <CardFooter>
            {this.props.post.tags.map(tag => {
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

export default SingleFavPost;

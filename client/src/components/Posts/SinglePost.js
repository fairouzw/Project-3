import React, { Component } from "react";
import AddComment from "./AddComment";
import LikeButton from "./LikeButton";
import moment from "moment";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Badge,
  Card,
  CardImg,
  CardBody,
  CardFooter,
  CardTitle,
  CardHeader,
  CardText
} from "reactstrap";

class SinglePost extends Component {
  intervalID
  constructor(props) {
    super(props);
    this.state = {
      post: this.props.post,
      comments: this.props.post.comments,
      time: []
    };
  }

  getTime = () => {
    var timeAgo = moment(this.props.post.createdAt).fromNow();
    this.setState({
      time: timeAgo

    });
    this.intervalID = setTimeout(this.getTime.bind(this), 5000);
  }

  componentDidMount() {
    this.getTime();
  }

  componentWillUnmount() {
    clearTimeout(this.intervalID);
  }

  addCommentHandler = newComment => {
    this.setState({
      comments: [...this.state.comments, newComment]
    });
  };

  toggleLike = event => {
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
          this.setState({
            post: response.data
          });
        })
        .catch(error => console.log(error));
    }
  };

  render() {
    // var timeAgo = moment(this.props.post.createdAt).fromNow();
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
            style={{ height: "200px", objectFit: "contain" }}
            className="post-pic"
            src={this.props.post.imgUrl}
            alt=""
          ></CardImg>
          <CardBody>
            <CardTitle style={{ textAlign: "center" }} > {this.props.post.postname} </CardTitle>
            <CardText style={{ textAlign: "center" }}>
              <div>{this.props.post.description}</div>
              <Link to={`/posts/${this.props.post._id}`}><p style={{ textAlign: "center" }}>{this.props.post.address}</p> </Link>
              <br />
              <div> <p style={{ textAlign: "center" }}>
                {" "}
                Posted{" "}
                <span className="date timeago" title={this.state.time}>
                  {this.state.time}
                </span>{" "}
              </p></div>
              <div style={{ textAlign: "center" }}>
                <LikeButton
                  likeCounter={this.state.post.likes}
                  toggleLike={this.toggleLike}
                  post={this.state.post}
                />
              </div>
              <div>  <hr /></div>
            </CardText>
            <div>
              {this.state.comments.map((c, idx) => {
                return (
                  <div key={idx} className="owner">
                    {c.owner.username} <i className="far fa-comment"></i> :{" "}
                    <span className="comment"> {c.comment} </span>{" "}
                  </div>
                );
              })}
            </div>
          </CardBody>
          <AddComment
            addComment={this.addCommentHandler}
            post={this.state.post}
          />
          <CardFooter>
            {this.props.post.tags.map((tag, idx) => {
              return (
                <Badge key={idx} id="btn-badge" pill>
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

export default SinglePost;

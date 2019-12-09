import React, { Component } from "react";
import AddComment from "./AddComment"
import LikeButton from "./LikeButton"
import moment from "moment";
import axios from "axios";
import { Link } from "react-router-dom";
import { Badge } from "reactstrap";

class SinglePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: this.props.post,
            comments: this.props.post.comments,
        };
    }

    addCommentHandler = (newComment) => {
        this.setState({
            comments: [...this.state.comments, newComment]
        })
    }


    toggleLike = (event) => {
        console.log("!!!!!!", this.props.post.hasLiked);
        const { post } = this.state
        if (!this.state.post.hasLiked) {
            return axios.post(`/api/posts/${this.state.post._id}/like`, { post })
                .then(response => {
                    this.setState({
                        post: response.data
                    })
                })
                .catch(error => console.log(error));
        } else {
            return axios.delete(`/api/posts/${this.state.post._id}/like`, { post })
                .then(response => {
                    this.setState({
                        post: response.data
                    })
                })
                .catch(error => console.log(error));
        }
    }

    render() {
        console.log(this.props.post.owner._id)
        var timeAgo = moment(this.props.post.createdAt).fromNow()
        return (
            <div className="one-post">
                <br></br>
                <h3>{this.props.post.postname}</h3>
                posted by<Link to={`/messages/new-message/${this.props.post.owner._id}`}> <span className="owner"> {this.props.post.owner.username} <i className="ni ni-email-83 text-blue" /> </span> </Link>
                <div>{this.props.post.description}</div>
                <img className="post-pic" src={this.props.post.imgUrl} alt=""></img>
                <p>{this.props.post.address}</p>
                <p> Posted <span className="date timeago" title={timeAgo}>{timeAgo}</span> </p>
                <LikeButton likeCounter={this.state.post.likes} toggleLike={this.toggleLike} post={this.state.post} />
                <br/>
                <br/>
                <div>{this.state.comments.map((c, idx) => {
                    return (<div key={idx} className="owner">{c.owner.username} <i className="far fa-comment"></i> : <span className="comment"> {c.comment} </span> </div>)
                })}</div>
                <br/>
                <AddComment addComment={this.addCommentHandler} post={this.state.post} />
                <br />
                {this.props.post.tags.map(tag => {
                   return  <Badge color="primary" pill>
                    {tag}
                  </Badge>
                })}
            </div>
        );
    }
}

export default SinglePost;






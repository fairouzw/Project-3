import React, { Component } from "react";
import AddComment from "./AddComment"
import LikeButton from "./LikeButton"
import moment from "moment";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";


class SinglePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // userData: this.props.userData,
            post: this.props.post,
            comments: this.props.post.comments,


        };
    }

    addCommentHandler = (newComment) => {
        // // comment : re-render the post list including the new post
        this.setState({
            comments: [...this.state.comments, newComment]
        })
    }


    toggleLike = (event) => {

        console.log(this.state.postId);
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
                    this.props.getAllPosts()
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
            <div/*  key={this.props.post._id}  */ className="one-post">
                <br></br>
                <h3 /* key={this.props.post._id} */>{this.props.post.postname}</h3>
                <p>posted by</p>  <Link to={`/messages/new-message/${this.props.post.owner._id}`}  ><p> <span className="owner"> {this.props.post.owner.username}</span></p></Link>

                <div>Details: {this.props.description}</div>
                <img className="post-pic" src={this.props.post.imgUrl} alt=""></img>
                <p>{this.props.post.address}</p>
                <p> Posted <span className="date timeago" title={timeAgo}>{timeAgo}</span> </p>

                <p>{this.state.post.likes}Likes</p>
                <LikeButton toggleLike={this.toggleLike} post={this.state.post} />

                <p><span className="comment">Comments:</span>{this.state.comments.map((c, idx) => {
                    return (<span key={idx}>"{c.comment}" <span className="comment">by</span> <span className="owner">{c.owner.username}</span></span>)

                })}</p>
                <AddComment addComment={this.addCommentHandler} post={this.state.post} />
                <br></br>
            </div>

        );
    }
}

export default SinglePost;






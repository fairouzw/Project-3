import React, { Component } from "react";
import AddComment from "./AddComment"
import LikeButton from "./LikeButton"
import moment from "moment";
import axios from "axios"


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
        var timeAgo = moment(this.props.post.createdAt).fromNow()
        return (
            <div/*  key={this.props.post._id}  */ className="one-post">
                <br></br>
                <h3 /* key={this.props.post._id} */>{this.props.post.postname}</h3>
                <p>posted by<span className="owner"> {this.props.post.owner.username}</span></p>
                <div>Details: {this.props.description}</div>
                <img className="post-pic" src={this.props.post.imgUrl} alt=""></img>
                <p>{this.props.post.address}</p>
                <p> Posted <span className="date timeago" title={timeAgo}>{timeAgo}</span> </p>
                <p>{this.state.post.likes}Likes</p>
                <LikeButton toggleLike={this.toggleLike} post={this.state.post} />
                <p>{this.state.comments.map((c, idx) => {
                    return (<div key={idx} className="owner">{c.owner.username} <i className="far fa-comment"></i> : <span className="comment"> {c.comment} </span> </div>)
                })}</p>
                <AddComment addComment={this.addCommentHandler} post={this.state.post} />
                <br/>
               <p>Tags: {this.props.post.tags.map(tag => {
                   return ` ${tag} ,` 
               })}</p> 
            </div>
        );
    }
}

export default SinglePost;






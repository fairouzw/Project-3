import React, { Component } from "react";
// import AddComment from "./AddComment"
// import LikeButton from "./LikeButton"
import moment from "moment";
import axios from "axios"


class SingleMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // userData: this.props.userData,
            message: this.props.message,



        };
    }

    // addCommentHandler = (newComment) => {
    //     // // comment : re-render the post list including the new post
    //     this.setState({
    //         comments: [...this.state.comments, newComment]
    //     })
    // }


    // toggleLike = (event) => {

    //     console.log(this.state.postId);
    //     const { post } = this.state
    //     if (!this.state.post.hasLiked) {
    //         return axios.post(`/api/posts/${this.state.post._id}/like`, { post })
    //             .then(response => {
    //                 this.setState({
    //                     post: response.data
    //                 })
    //             })
    //             .catch(error => console.log(error));
    //     } else {
    //         return axios.delete(`/api/posts/${this.state.post._id}/like`, { post })
    //             .then(response => {
    //                 this.props.getAllPosts()
    //                 this.setState({
    //                     post: response.data
    //                 })
    //             })
    //             .catch(error => console.log(error));
    //     }
    // }

    render() {
        var timeAgo = moment(this.props.message.createdAt).fromNow()
        return (
            <div/*  key={this.props.post._id}  */ className="one-post">
                <br></br>
                <h3 /* key={this.props.post._id} */>{this.props.message.subject}</h3>
                <p>send by<span className="owner"> {this.props.message.sender.username}</span></p>
                <div>Content: {this.props.message.content}</div>

                <p>{this.props.message.read}</p>
                <p> Posted <span className="date timeago" title={timeAgo}>{timeAgo}</span> </p>
                <br></br>
            </div>

        );
    }
}

export default SingleMessage;






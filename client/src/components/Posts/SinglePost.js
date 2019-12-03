import React, { Component } from "react";
import AddComment from "./AddComment"
import LikeButton from "./LikeButton"
import moment from "moment";


class SinglePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // userData: this.props.userData,
            post: this.props.post,
            comments: this.props.post.comments,
            likes: this.props.post.likes

        };
    }

    addCommentHandler = (newComment) => {
        // // comment : re-render the post list including the new post
        this.setState({
            comments: [...this.state.comments, newComment]
        })
    }
    addLikeHandler = (newLike) => {
        console.log('ding dong')
        // // task : re-render the project list including the new project
        this.setState({
            likes: this.state.likes + 1
        })
    }

    render() {
        var timeAgo = moment(this.props.post.createdAt).fromNow()
        return (
            <div/*  key={this.props.post._id}  */ className="one-post">
                <br></br>
                <h3 /* key={this.props.post._id} */>{this.props.post.postname}</h3>
                <div>Details: {this.props.description}</div>
                <img className="post-pic" src={this.props.post.imgUrl} alt=""></img>
                <p>{this.props.post.address}</p>
                <p> Posted <span className="date timeago" title={timeAgo}>{timeAgo}</span> </p>

                <p>{this.state.likes}Likes</p>
                <LikeButton addLike={this.addLikeHandler} post={this.state.post} />
                <p><span className="comment">Comments:</span>{this.state.comments.map((c, idx) => {
                    return (<span key={idx}>"{c.comment}" <span className="comment">by</span> {c.owner}</span>)
                })}</p>
                <AddComment addComment={this.addCommentHandler} post={this.state.post} />
                <br></br>
            </div>

        );
    }
}

export default SinglePost;






import React, { Component } from "react";
import AddComment from "./AddComment"
import LikeButton from "./LikeButton"

import {
    Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody
  } from 'reactstrap';

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
        // // task : re-render the project list including the new project
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
        return (
            
            <div key={this.state.post._id} className="one-post">
                <br></br>
                <h3 key={this.state.post._id}>Thing: {this.state.post.postname}</h3>
                <div>Description: {this.state.post.description}</div>
                <img className="post-pic" src={this.state.post.imgUrl} alt=""></img>
                <p>{this.state.post.address}</p>
                <p>{this.state.likes}Likes</p>
                <LikeButton addLike={this.addLikeHandler} post={this.state.post} />
                <p>Comments:{this.state.comments.map((c, idx) => {
                    return (<span key={idx}>{c.comment}</span>)
                })}</p>
                <AddComment addComment={this.addCommentHandler} post={this.state.post} />
                <br></br>

            </div>
             
        );
    }
}

export default SinglePost;






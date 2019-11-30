import React, { Component } from "react";
import AddComment from "./AddComment"

class SinglePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // userData: this.props.userData,
            post: this.props.post,
            comments: this.props.post.comments

        };
    }

    addCommentHandler = (newComment) => {
        // // task : re-render the project list including the new project
        this.setState({
            comments: [...this.state.comments, newComment]
        })
    }

    render() {
        // console.log(this.state.userLocation);
        // console.log(this.props.posts);
        return (

            <div key={this.state.post._id} className="one-post">
                <br></br>
                <h3 key={this.state.post._id}>Thing: {this.state.post.postname}</h3>
                <div>Description: {this.state.post.description}</div>
                <img className="post-pic" src={this.state.post.imgUrl} alt=""></img>
                <p>{this.state.post.address}</p>
                <p>{this.state.post.likes}Likes</p>

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






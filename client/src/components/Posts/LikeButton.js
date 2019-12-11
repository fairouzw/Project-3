import React, { Component } from "react";
import "../../App.css";

class LikeButton extends Component {
    render() {
        let buttonText = this.props.post.hasLiked ? 'Unlike' : 'Like';
        return (
            <button onClick={this.props.toggleLike} className="like">
               {this.props.likeCounter}  <i className={this.props.post.hasLiked ? "fa fa-heart" : "far fa-heart"} style={{color: "red"}} > </i> &nbsp;
        {buttonText}
        </button>
        );
    }
}
export default LikeButton;


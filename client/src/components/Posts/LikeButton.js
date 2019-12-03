import React, { Component } from "react";
import axios from "axios";
import "../../App.css";

class LikeButton extends Component {
    render() {
        let buttonText = this.props.post.hasLiked ? 'Unlike' : 'Like';
        return (
            <button onClick={this.props.toggleLike} className="like">
                <i className="fa fa-heart"></i>&nbsp;
          {buttonText}</button>
        );
    }
}
export default LikeButton;
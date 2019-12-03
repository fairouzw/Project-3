import React, { Component } from "react";
import axios from "axios";
import "../../App.css";

class LikeButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: this.props.post,
            postId: this.props.post._id,
            liked: this.props.post.hasLiked // how to ask this from backend???
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {

        console.log(this.state.postId);
        const { post } = this.state
        axios.post(`/api/posts/${this.state.postId}/like`, { post })
            .then(response => {
                let like = response.data
                this.props.addLike(like)
                this.setState({
                    liked: true,
                    post: this.state.post
                })
            })

            .catch(error => console.log(error));
        this.setState({ liked: !this.state.liked });
    }
    render() {
        let buttonText = this.state.liked ? 'Unlike' : 'Like';
        return (
            <button onClick={this.handleClick} className="like">
                <i className="fa fa-heart"></i>&nbsp;
          {buttonText}</button>
        );
    }
}
export default LikeButton;
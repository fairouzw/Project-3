import React, { Component } from 'react'
import { Link } from "react-router-dom";
import AddComment from "../Posts/AddComment"
import LikeButton from "../Posts/LikeButton"
import moment from "moment";
import axios from "axios"

class SingleFavPost extends Component {
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
            <div className="one-post">
                <br></br>
                <h3>{this.props.post.postname}</h3>
                <p>posted by</p>  <Link to={`/messages/new-message/${this.props.post.owner._id}`}  ><p> <span className="owner"> {this.props.post.owner.username}</span></p></Link>

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

                <Link to={`/posts/${this.props.post._id}`}><p>See post on map</p></Link>

            </div>
        )
    }
}

export default SingleFavPost

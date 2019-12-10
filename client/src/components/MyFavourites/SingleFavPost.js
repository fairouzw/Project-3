import React, { Component } from 'react'
import { Link } from "react-router-dom";
import AddComment from "../Posts/AddComment"
import LikeButton from "../Posts/LikeButton"
import moment from "moment";
import axios from "axios"
import { Card, CardImg, CardTitle } from "reactstrap";

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
            <Card>
            <div className="one-post">
                <CardImg /* top width="100%"  */style={{height:"250px", width:"100%"}} className="post-pic" src={this.props.post.imgUrl} alt=""></CardImg>
                <CardTitle >{this.props.post.postname}</CardTitle>
                <div className="posted-by-container"><div className="posted-by-box"> posted by <Link to={`/messages/new-message/${this.props.post.owner._id}`}> <span className="owner icon-text">{this.props.post.owner.username}  <i className="ni ni-email-83 text-blue icon-message" /></span> </Link></div></div>
                <div>{this.props.description}</div>
                <Link to={`/posts/${this.props.post._id}`}><p>{this.props.post.address}</p></Link>
                <p> Posted <span className="date timeago" title={timeAgo}>{timeAgo}</span> </p>
                <LikeButton likeCounter={this.state.post.likes} toggleLike={this.toggleLike} post={this.state.post} />
               <br/>
                <hr/>
                <p>{this.state.comments.map((c, idx) => {
                    return (<div key={idx} className="owner">{c.owner.username} <i className="far fa-comment"></i> : <span className="comment"> {c.comment} </span> </div>)
                })}</p>
                <AddComment addComment={this.addCommentHandler} post={this.state.post} />
               
             </div>
             </Card>
        )
    }
}

export default SingleFavPost

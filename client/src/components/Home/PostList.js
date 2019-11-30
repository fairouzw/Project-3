import React, { Component } from "react";
import AddComment from "../Posts/AddComment";
import SinglePost from "../Posts/SinglePost"

class PostList extends Component {


    render() {
        // console.log(this.state.userLocation);
        // console.log(this.props.posts);
        return (
            <div>
                <h1>Check out what's out there:</h1>
                <div className="all-posts">
                    {this.props.posts.map((post, idx) => {
                        return (<SinglePost post={post} />

                            // <div key={idx} className="one-post">
                            //     <br></br>
                            //     <h3 key={post._id}>Thing: {post.postname}</h3>
                            //     <div>Description: {post.description}</div>
                            //     <img className="post-pic" src={post.imgUrl} alt=""></img>
                            //     <p>{post.address}</p>
                            //     <p>Comments:{post.comments.map((c, idx) => {
                            //         return (<span key={idx}>{c.comment}</span>)
                            //     })}</p>
                            //     <AddComment addComment={this.post} />
                            //     <br></br>
                            // </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default PostList;






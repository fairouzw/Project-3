import React, { Component } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

class DisplayPost extends Component {



    render() {
        // console.log(this.state.userLocation);
        // console.log(this.props.posts);

        return (
            <div>
                <h1>Check out what's out there:</h1>
                <div className="all-posts">
                    {this.props.posts.map(post => {
                        return (

                            <div className="one-post">
                                <br></br>
                                <h3 key={post._id}>Thing: {post.postname}</h3>
                                <div>Description: {post.description}</div>
                                <img className="post-pic" src={post.imgUrl} alt=""></img>
                                <br></br>
                            </div>

                        );
                    })}
                </div>






            </div>
        );
    }
}

export default DisplayPost;





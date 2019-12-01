import React, { Component } from "react";
import AddComment from "../Posts/AddComment";
import SinglePost from "../Posts/SinglePost"

import {
    CardDeck,
    CardGroup,
    Row
  } from 'reactstrap';

class PostList extends Component {

    render() {
        return (       
                <Row style={{justifyContent: "center"}}>
                    {this.props.posts.map((post, idx) => {
                        return (
                        <SinglePost key={idx} post={post} />
                        )})}
                </Row>
        );
    }
}

export default PostList;






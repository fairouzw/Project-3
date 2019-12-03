import React, { Component } from "react";
import SinglePost from "../Posts/SinglePost"

import {
    Row
} from 'reactstrap';

class PostList extends Component {

    render() {
        return (
            <Row style={{ justifyContent: "center" }}>
                {this.props.posts.map((post, idx) => {
                    return (
                        <SinglePost key={idx} post={post} />
                    )
                })}
            </Row>
        );
    }
}

export default PostList;






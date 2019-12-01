import React, { Component } from "react";
import AddComment from "../Posts/AddComment";
import SinglePost from "../Posts/SinglePost"

import {
    Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody
  } from 'reactstrap';

class PostList extends Component {

    render() {
        return (       
                <CardDeck>
             
                    {this.props.posts.map((post, idx) => {
                        return (
                        <SinglePost key={idx} post={post} />
                        )})}
                
                </CardDeck>
        );
    }
}

export default PostList;






import React, { Component } from "react";
import SingleMessage from "./SingleMessage"

import {
    Row,
    ListGroup,
    ListGroupItem
} from 'reactstrap';

class MessageList extends Component {

    render() {
        return (
            <ListGroup style={{ justifyContent: "center" }}>
                {this.props.messages.map((message, idx) => {
                    return (
                        <ListGroupItem> <SingleMessage key={idx} message={message} /></ListGroupItem>
                    )
                })}
            </ListGroup>
        );
    }
}

export default MessageList;

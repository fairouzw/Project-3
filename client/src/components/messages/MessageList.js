import React, { Component } from "react";
import SingleMessage from "./SingleMessage"

import {
    Row
} from 'reactstrap';

class MessageList extends Component {

    render() {
        return (
            <Row style={{ justifyContent: "center" }}>
                {this.props.messages.map((message, idx) => {
                    return (
                        <SingleMessage key={idx} message={message} />
                    )
                })}
            </Row>
        );
    }
}

export default MessageList;






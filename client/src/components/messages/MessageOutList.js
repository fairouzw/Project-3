import React, { Component } from "react";
import SingleOutMessage from "./SingleOutMessage"

import {
    Row
} from 'reactstrap';

class MessageList extends Component {

    render() {
        return (
            <Row style={{ justifyContent: "center" }}>
                {this.props.messages.map((message, idx) => {
                    return (
                        <SingleOutMessage key={idx} message={message} />
                    )
                })}
            </Row>
        );
    }
}

export default MessageList;






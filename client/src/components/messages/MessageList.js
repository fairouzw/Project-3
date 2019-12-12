import React, { Component } from "react";
import SingleMessage from "./SingleMessage"

import {
    Table
} from 'reactstrap';

class MessageList extends Component {

    render() {
        return (
            <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
            <tr>
                      <th scope="col">Sender:</th>
                      <th scope="col">Subject:</th>
                      <th scope="col">Message:</th>
                      {/* <th scope="col">Read at:</th> */}
                      <th scope="col">Sent at:</th>
                    </tr>
            </thead>
            <tbody>
                {this.props.messages.map((message, idx) => {
                    return (
                        <SingleMessage key={idx} message={message} />
                    )
                })}
            </tbody>
            </Table>
        );
    }
}

export default MessageList;

import React, { Component } from "react";
import moment from "moment";

import { Link } from "react-router-dom";


class SingleOutMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // userData: this.props.userData,
            message: this.props.message,

        };
    }


    render() {
        console.log(this.state.message.sender._id)
        var timeAgo = moment(this.props.message.createdAt).fromNow()
        return (
          <tr>
                <th scope="row">
                  <Link to={`/messages/new-message/${this.state.message.recipient._id}`} > <p> <i className="ni ni-email-83 owner icon-message" /> <span className="owner"> {this.props.message.recipient.username}</span>
                </p>
                  </Link>
                </th>
                 <td>
                    <div>{this.props.message.subject}</div>
                 </td>
                    <td>
                    <div>{this.props.message.content}</div>
                    </td>
                    <td ><p> {this.props.message.read == null ? <p style={{ color: "red" }}>unread</p> : <span style={{ color: "green" }}><i className="fa fa-check text-green"></i></span>}</p></td>
                    <td><p><span className="date timeago" title={timeAgo}>{timeAgo}</span> </p></td>
           </tr>  
        );
    }
}

export default SingleOutMessage;
import React, { Component } from "react";
import moment from "moment";
import "../../App.css";
import { Link } from "react-router-dom";

class SingleMessage extends Component {
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
                    <Link to={`/messages/new-message/${this.state.message.sender._id}`} ><p> <i className="ni ni-email-83 owner icon-message" /><span className="owner">{this.props.message.sender.username}</span> </p></Link>
                </th>
                
                  <td>
                    {this.props.message.subject}
                   </td>
                   <td>
                    <div >{this.props.message.content}</div>
                       </td>
                    {/* <td >
                        <p><span > {moment().format(`${this.props.message.read}`)} </span> </p> 
                        </td> */}
                    <td > <p> <span className="date timeago" title={timeAgo}> {timeAgo}</span> </p>
                    </td>
                    </tr>
        );
    }
}

export default SingleMessage;

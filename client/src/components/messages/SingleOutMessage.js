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
            <div className="one-post">
                <br></br>
                <h3>{this.props.message.subject}</h3>
                <div>sent to <Link to={`/messages/new-message/${this.state.message.recipient._id}`} ><p><span className="owner"> {this.props.message.recipient.username}</span></p></Link>
                </div>
                {/* <div>sent by
                    <Link to={`/messages/new-message/${this.state.message.sender._id}`} ><p><span className="owner"> {this.props.message.sender.username}</span></p></Link>

                </div> */}
                <div>Content: {this.props.message.content}</div>

                <p>{this.props.message.read}</p>
                <p> Posted <span className="date timeago" title={timeAgo}>{timeAgo}</span> </p>
                <br></br>
            </div>

        );
    }
}

export default SingleOutMessage;






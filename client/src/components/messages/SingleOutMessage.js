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
            <div className="single-post">
                <div className="one-post-con">

                    <div className="single-post-margin"> Subject:<h3>{this.props.message.subject}</h3></div>
                    <div className="single-post-margin">sent to <Link to={`/messages/new-message/${this.state.message.recipient._id}`} ><p><h4><span className="owner"> {this.props.message.recipient.username}</span></h4></p></Link>
                    </div>
                    {/* <div>sent by
                    <Link to={`/messages/new-message/${this.state.message.sender._id}`} ><p><span className="owner"> {this.props.message.sender.username}</span></p></Link>
                </div> */}
                    <div className="single-post-margin">Content: {this.props.message.content}</div>

                    <div className="single-post-margin"> <p> {this.props.message.read == null ? <p style={{ color: "red" }}>message unread</p> : <span style={{ color: "green" }}>message read</span>}</p></div>
                    <div className="single-post-margin"><p> sent <span className="date timeago" title={timeAgo}>{timeAgo}</span> </p></div>

                </div>
            </div>
        );
    }
}

export default SingleOutMessage;
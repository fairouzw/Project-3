import React, { Component } from "react";
import moment from "moment";

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
            <div className="single-post">
                <div className="one-post-con">
                    <div className="single-post-margin">Subject:
                <h3>{this.props.message.subject}</h3>
                    </div>


                    <div className="single-post-margin">sent by
                    <Link to={`/messages/new-message/${this.state.message.sender._id}`} ><p><h4> <span className="owner">{this.props.message.sender.username}</span></h4></p></Link>

                    </div>
                    <div className="single-post-margin">Content: {this.props.message.content}</div>
                    <div className="single-post-margin">
                        <p>read at {this.props.message.read}</p> </div>
                    <div className="single-post-margin"> <p> posted <span className="date timeago" title={timeAgo}>{timeAgo}</span> </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default SingleMessage;

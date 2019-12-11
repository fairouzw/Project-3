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
            <div className="single-post">
                <div className="one-post-con">
                    <div className="single-post-margin">From
                    <Link to={`/messages/new-message/${this.state.message.sender._id}`} ><h3><i className="ni ni-email-83 owner icon-message" /><span className="owner">{this.props.message.sender.username}:</span></h3></Link>

                    </div>
                    <div className="single-post-margin">Subject:
                <h2>{this.props.message.subject}</h2>
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

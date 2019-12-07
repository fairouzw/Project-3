import React, { Component } from "react";
import AddMessage from "./AddMessage";
class MessagePopup extends Component {
    render() {
        console.log(this.props.recipientId)
        return (
            <div className='Message'>
                <div className='Message_inner'>
                    <h1>{this.props.text}</h1>
                    <AddMessage getAllSentMessagesOfLoggedInUser={this.props.getAllSentMessagesOfLoggedInUser}
                        closeMessagePopup={this.props.closeMessagePopup} recipient={this.props.recipientId}
                    />
                    <button onClick={this.props.closeMessagePopup}>X</button>
                </div>
            </div>
        );
    }
}

export default MessagePopup;
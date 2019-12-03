import React from 'react'
import { render } from 'react-dom'
import { Modal, Button } from 'react-bootstrap'

import MessageBox from 'react-message-box'

import 'bootstrap/dist/css/bootstrap.css'

class Messages extends React.Component {
    showAlert() {
        this.refs.messageBox.alert("Alert", "This is alert!").ok(() => {
            console.log("Alert ok!");
        });
    }

    showConfirm() {
        this.refs.messageBox.confirm("Confirm", "This is confirm!").ok(() => {
            console.log("Confirm ok!");
        }).cancle(() => {
            console.log("Confirm cancle!");
        });
    }

    render() {
        return (
            <div>
                <Button onClick={this.showAlert.bind(this)}>Alert Box</Button>
                <Button onClick={this.showConfirm.bind(this)}>Confirm Box</Button>
                <MessageBox ref="messageBox" />
            </div>
        );
    }
}

export default Messages
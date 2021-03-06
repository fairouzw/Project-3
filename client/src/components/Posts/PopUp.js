import React, { Component } from "react";
import AddPost from "./AddPost";
class Popup extends Component {
    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <h1>{this.props.text}</h1>
                    <AddPost   getAllPosts={this.props.getAllPosts}   
                    closePopup={this.props.closePopup}
                    />
                    <button onClick={this.props.closePopup}>X</button>
                </div>
            </div>
        );
    }
}

export default Popup;


import React, { Component } from "react";
import axios from "axios";

import {
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col 
  } from 'reactstrap';

class AddComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: "",
            postId: this.props.post._id,
            post: this.props.post
        };
    }



    handleFormSubmit = event => {
        event.preventDefault();
        console.log("i clicked")

        // this.props.showPopup
        const { comment, postId } = this.state
        axios.post('/api/comments/new-comment', { comment, postId })
            .then(response => {
                let comment = response.data
                this.props.addComment(comment)
                this.setState({
                    comment: '',
                    post: this.state.post
                })
            })

            .catch(error => console.log(error));

        // const newlyCreatedProject = response.data
        // this.props.addProject(newlyCreatedProject) // { title, description, _id }


    };


    handleChange = e => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }

    // deleteComment = () => {
    //     axios.delete(`/api/comments/${this.state.commentId}`)
    //         .then(res => {
    //             console.log(res);
    //             if (res.status === 200) {
    //                 this.props.getAllUserPosts()
    //             } else {
    //                 console.log("Delete function didn't work!")
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

    render() {

        return (
            <div className="container">
                
                    <form onSubmit={this.handleFormSubmit}>
                       {/*  <label htmlFor="inputEmail">Title/Caption</label> */}
                       <InputGroup className="mb-4">
                       <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        {/* <i className="ni ni-zoom-split-in" />{} */}
                        <i className="far fa-comments"></i>
                        </InputGroupText>
                        </InputGroupAddon>
                       
                            <Input
                                type="text"
                                id="comment"
                                className="form-control"
                                Placeholder=" Write a comment"
                                name="comment"
                                value={this.state.comment}
                                onChange={this.handleChange}
                            // required
                            // autoFocus
                            />
                            </InputGroup>
                            <div>
                        <button
                            className="btn btn-sm btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                            type="submit"

                        >
                            Add Comment
                        </button>
                        </div>
                      
                    </form>
                    {/* <button onClick={() => this.deleteComment()}>Delete Post</button> */}
     
            </div>
        );
    }
}

export default AddComment;

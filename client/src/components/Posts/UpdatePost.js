import React, { Component } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Input } from "reactstrap";

class UpdatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postId: this.props.id,
            imgUrl: this.props.imgUrl,
            description: this.props.description,
            postname: this.props.postname,
            likes: this.props.likes,
            listOfPosts: this.props.posts
        };
    }

    updatePost = () => {
        // this.state.editPostId = event.target._id;
        console.log(this.state.postId);
        console.log(this.state.likes);

        const { description, postname, imgUrl } = this.state;

        return axios
            .put(`/api/posts/${this.state.postId}`, {
                imgUrl,
                description,
                postname,



            })
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    this.props.getAllUserPosts();
                    this.setState({ likes: this.props.likes })
                } else {
                    console.log("SAve function didn't work!");
                }
            })


            .catch(error => console.log(error));
    };

    handleFileUpload = target => {
        console.log("The file to be uploaded is: ", target.files[0]);
        const uploadData = new FormData();
        uploadData.append("imgUrl", target.files[0]);

        return axios
            .post("/api/upload", uploadData)
            .then(response => {
                console.log("response is: ", response);
                // after the console.log we can see that response carries 'secure_url' which we can use to update the state
                this.setState({
                    imgUrl: response.data.secure_url
                });
            })
            .catch(err => {
                console.log("Error while uploading the file: ", err);
            });
    };

    handleFormSubmit = event => {
        event.preventDefault();

        let imgUrlInput = event.target.getElementsByClassName("imgUrl")[0];

        console.log("image input files", imgUrlInput.files);

        // checking if the user updated the picture.. if so we need to upload it first before updating the post
        if (imgUrlInput.files.length > 0) {
            this.handleFileUpload(
                event.target.getElementsByClassName("imgUrl")[0]
            ).then(() => {
                this.updatePost();
            });
        } else {
            this.updatePost();
        }
    };

    // handleChange = event => {
    //     if (
    //         event.target.name === "location" &&
    //         event.target.value === "Current Location"
    //     ) {
    //         return;
    //     }
    //     const { name, value } = event.target;
    //     this.setState({ [name]: value });
    // };

    handleInputChange = e => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    };

    deletePost = () => {
        axios
            .delete(`/api/posts/${this.state.postId}`)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    this.props.getAllUserPosts();
                } else {
                    console.log("Delete function didn't work!");
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
    render() {
        return (
            <div>
                <Form onSubmit={this.handleFormSubmit} key={this.state._id}>
                    <FormGroup>
                        <label className="form-control-label" htmlFor="input-username">
                            Caption
            </label>
                        <Input
                            type="text"
                            name="postname"
                            value={this.state.postname}
                            onChange={e => this.handleInputChange(e)}
                            placeholder="Caption"
                        />
                        <label className="form-control-label" htmlFor="input-username">
                            Description
            </label>
                        <Input
                            name="description"
                            type="text"
                            value={this.state.description}
                            onChange={e => this.handleInputChange(e)}
                            placeholder="Description"
                        />
                        <label className="form-control-label" htmlFor="input-username">
                            Update Image
            </label>
                        <Input
                            name="imgUrl"
                            type="file"
                            className="imgUrl"
                            id="file-input"
                            onChange={e => this.handleInputChange(e)}
                        />
                    </FormGroup>
                    <Button
                        id="btn-submit"
                        className="btn-login text-uppercase font-weight-bold mb-2"
                        type="submit"
                    >
                        SAVE
          </Button>
                </Form>
                <Button
                    color="danger"
                    size="sm"
                    outline
                    className="btn-login text-uppercase font-weight-bold mb-2"
                    onClick={() => this.deletePost()}
                >
                    DELETE
        </Button>
            </div>
        );
    }
}

export default UpdatePost;

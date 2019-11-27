import React, { Component } from "react";
import axios from "axios";

function getLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => {
            resolve(position.coords);
        });
    });
}
class UpdatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postId: this.props.id,
            imgUrl: this.props.imgUrl,
            description: this.props.description,
            postname: this.props.postname,

        };
    }

    // handleFileUpload = target => {
    //     // console.log("The file to be uploaded is: ", target.files[0]);

    //     const uploadData = new FormData();
    //     // imageUrl => this name has to be the same as in the model since we pass
    //     // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    //     uploadData.append("imgUrl", target.files[0]);

    //     return axios
    //         .put("/api/posts/${this.state.postId}", uploadData)
    //         .then(response => {
    //             console.log("response is: ", response);
    //             // after the console.log we can see that response carries 'secure_url' which we can use to update the state
    //             return response.data.secure_url;
    //         })
    //         .catch(err => {
    //             console.log("Error while uploading the file: ", err);
    //         });
    // };

    handleFileUpload = (target) => {
        console.log("The file to be uploaded is: ", target.files[0]);
        const uploadData = new FormData();
        uploadData.append("imgUrl", target.files[0]);

        return axios
            .post("/api/upload", uploadData)
            .then(response => {
                console.log("response is: ", response);
                // after the console.log we can see that response carries 'secure_url' which we can use to update the state
                return response.data.secure_url;
            })
            .catch(err => {
                console.log("Error while uploading the file: ", err);
            });
    };

    handleFormSubmit = (event) => {
        event.preventDefault();

        // this.state.editPostId = event.target._id;
        console.log(this.state.postId);

        const { description, postname } = this.state;
        this.handleFileUpload(event.target.getElementsByClassName("imgUrl")[0])
            .then(
                imgUrl => {
                    return axios.put(`/api/posts/${this.state.postId}`, {
                        imgUrl,
                        description,
                        postname
                    })
                        .then(() => {
                            // this.props.getData();
                            this.setState({
                                description: "",
                                postname: ""
                            });
                        })
                        .catch(error => console.log(error));
                })
    }




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
    }

    deletePost = () => {

        axios.delete(`/api/posts/${this.state.postId}`)
            .then(() => {
                this.props.history.push('/posts'); // !!!         
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleFormSubmit} key={this.state._id}>
                    <input type='text' name='postname' value={this.state.postname} onChange={e => this.handleInputChange(e)} placeholder='Postname' />
                    <input name='description' type='text' value={this.state.description} onChange={e => this.handleInputChange(e)} placeholder='description' />
                    <input name='imgUrl' type='file' className="imgUrl" id="file-input" onChange={e => this.handleInputChange(e)} />

                    <button type='submit'>Save</button>
                    <button onClick={() => this.deletePost()}>Delete Post</button>
                </form>

            </div>
        )
    }

}


export default UpdatePost;
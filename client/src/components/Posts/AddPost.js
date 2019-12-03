import React, { Component } from "react";
import axios from "axios";

function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => {
        resolve(position.coords);
      });
})}

class AddPost extends Component {
  constructor() {
    super();
    this.state = {
      imgUrl: "",
      description: "",
      postname: ""
    };
  }

  handleFileUpload = target => {
    console.log("The file to be uploaded is: ", target.files[0]);

    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("imgUrl", target.files[0]);

    return axios
      .post("/api/upload", uploadData)
      .then(response => {
        console.log("response is: ", response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        return { url: response.data.secure_url, tags: response.data.tags }
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("i clicked")
    const { description, postname } = this.state;

    Promise.all([
      this.handleFileUpload(event.target.getElementsByClassName("imgUrl")[0]),
      getLocation()
    ])
      .then(([imgUploadResult, location]) => {
        return axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location.longitude},${location.latitude}.json?access_token=pk.eyJ1IjoibG9zLWxlbmEiLCJhIjoiY2szNHllYzI5MTZsOTNubzI1emZ2aHFiaSJ9.v7gsBidhvQm2T5EOb_GcGA`)
          .then(result=>{
            return axios.post("/api/posts/new-post", {
              imgUrl: imgUploadResult.url,
              location: { lat: location.latitude, long: location.longitude },
              description,
              postname,
              address: result.data.features[0].place_name,
              tags: imgUploadResult.tags
            })
        }).then(() => {
          this.props.getAllPosts();
          this.props.closePopup(event);
          this.setState({
            imgUrl: "",
            description: "",
            postname: ""
          });
        });
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    if (
      event.target.name === "location" &&
      event.target.value === "Current Location"
    ) {
      return;
    }
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {

    return (
      <div className="container">
        <div className="row">
          <form onSubmit={this.handleFormSubmit}>
            <label htmlFor="inputEmail">Title/Caption</label>
            <div className="form-label-group">
              <input
                type="text"
                id="inputEmail"
                className="form-control"
                placeholder="Caption"
                name="postname"
                value={this.state.postname}
                onChange={this.handleChange}
              required
              // autoFocus
              />
            </div>
            <label htmlFor="inputEmail">Upload an image</label>

            <div className="form-label-group">
              <input type="file" className="imgUrl" required/>
            </div>
            <label htmlFor="inputEmail">Description</label>
            <div className="form-label-group">
              <input
                type="text"
                id="inputEmail"
                className="form-control"
                placeholder="Write something"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
              // required
              // autoFocus
              />
            </div>
            <label htmlFor="inputEmail">Location</label>
            <br />
            <button
              className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
              type="submit"

            >
              POST
            </button>
            <div className="text-center"></div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddPost;

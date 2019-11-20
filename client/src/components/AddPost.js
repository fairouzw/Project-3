import React, { Component } from "react";
// import service from '../api/service';
import axios from "axios";

function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => {
      resolve(position.coords);
    });
  });
}

class AddPost extends Component {
  constructor() {
    super();
    this.state = {
      imgUrl: "",
      description: "",
      postname: ""
    };
  }

  // handleFileUpload = e => {
  //   console.log("The file to be uploaded is: ", e.target.files[0]);

  //   const uploadData = new FormData();
  //   // imageUrl => this name has to be the same as in the model since we pass
  //   // req.body to .create() method when creating a new thing in '/api/things/create' POST route
  //   uploadData.append("imgUrl", e.target.files[0]);

  //   service
  //     .handleUpload(uploadData)
  //     .then(response => {
  //       // console.log('response is: ', response);
  //       // after the console.log we can see that response carries 'secure_url' which we can use to update the state
  //       this.setState({ imgUrl: response.secure_url });
  //     })
  //     .catch(err => {
  //       console.log("Error while uploading the file: ", err);
  //     });
  // };

  handleFormSubmit = event => {
    event.preventDefault();

    const { imgUrl, description, postname } = this.state;

    // service
    //   .saveNewThing(this.state)
    //   .then(res => {
    //     console.log("added: ", res);
    //     // here you would redirect to some other page
    //   })
    //   .catch(err => {
    //     console.log("Error while adding the thing: ", err);
    //   });

    getLocation()
      .then(location => {
        return axios.post("/api/posts/new-post", {
          imgUrl,
          location: { lat: location.latitude, long: location.longitude },
          description,
          postname
        });
      })
      .then(() => {
        // this.props.getData();
        this.setState({
          imgUrl: "",
          description: "",
          postname: ""
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
    console.log(this.location);
    return (
      <div>
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

                  // required
                  // autoFocus
                />
              </div>
              <label htmlFor="inputEmail">Upload an image</label>

              <div className="form-label-group">
                <input type="file" onChange={e => this.handleFileUpload(e)} />
                {/* <input
                  id="inputEmail"
                  className="form-control"
                  placeholder="Image"
                  name="imageUrl"
                  value={this.state.imgUrl}
                  onChange={this.handleChange}

                  // required
                  // autoFocus
                /> */}
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
              {/* <div className="form-label-group">
                <input
                  type="text"
                  id="inputEmail"
                  className="form-control"
                  placeholder="search"
                  name="location"
                  value={this.state.location}
                  onChange={this.handleChange}
                  // required
                  // autoFocus
                />
              </div> */}
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
      </div>
    );
  }
}

export default AddPost;

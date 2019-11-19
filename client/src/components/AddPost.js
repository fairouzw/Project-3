import React, { Component } from "react";
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
      location: "",
      description: "",
      postName: ""
    };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { imgUrl, description, postName } = this.state;

    getLocation()
      .then(location => {
        return axios
          .post("/api/posts/new-post", {
            imgUrl,
            location: { lat: location.latitude, lon: location.logitude },
            description,
            postName
          })
      })
      .then(() => {
        // this.props.getData();
        this.setState({
          imgUrl: "",
          location: "",
          description: "",
          postName: ""
        });
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    if (event.target.name === 'location' && event.target.value === 'Current Location') {
      return;
    }
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
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
                  name="postName"
                  value={this.state.postName}
                  onChange={this.handleChange}

                // required
                // autoFocus
                />
              </div>
              <label htmlFor="inputEmail">Upload an image</label>
              <div className="form-label-group">
                <input
                  id="inputEmail"
                  className="form-control"
                  placeholder="Image"
                  name="imageUrl"
                  value={this.state.imgUrl}
                  onChange={this.handleChange}

                // required
                // autoFocus
                />
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
              <div className="form-label-group">
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
              </div>
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

import React, { Component } from "react";
import axios from "axios";

import { Input, InputGroupAddon, InputGroupText, InputGroup, Button } from "reactstrap";

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
    const { comment, postId } = this.state;
    axios
      .post("/api/comments/new-comment", { comment, postId })
      .then(response => {
        let comment = response.data;
        this.props.addComment(comment);
        this.setState({
          comment: "",
          post: this.state.post
        });
      })
      .catch(error => console.log(error));
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleFormSubmit}>
          <InputGroup className="mb-4">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="far fa-comments"></i>
              </InputGroupText>
            </InputGroupAddon>

            <Input
              type="text"
              id="comment"
              className="form-control"
              placeholder=" Write a comment"
              name="comment"
              value={this.state.comment}
              onChange={this.handleChange}
            />
            <InputGroupAddon addonType="append">
              <Button 
                 className="text-uppercase font-weight-bold"
                 color="primary"
                 type="submit"
                 >Add
                 </Button>
        </InputGroupAddon>
          </InputGroup>
          {/* <div>
            <button
              className="btn btn-sm btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
              type="submit"
            >
              Add Comment
            </button>
          </div> */}
        </form>
      </div>
    );
  }
}

export default AddComment;

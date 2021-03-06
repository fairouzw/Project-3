import React, { Component } from "react";

import { Input, InputGroupAddon, InputGroupText, InputGroup } from "reactstrap";

class Search extends Component {
  changeHandler = (e) => {
    let { value } = e.target;
    this.props.searchPost(value);
  };

  render() {
    return (
      <InputGroup className="mb-4">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="ni ni-zoom-split-in" />
          </InputGroupText>
        </InputGroupAddon>

        <Input
          className="input"
          type="text"
          name="search"
          placeholder="Search Finds"
          onChange={this.changeHandler}
        ></Input>
      </InputGroup>
    );
  }
}

export default Search;

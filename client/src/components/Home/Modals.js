import React from "react";
import AddPost from "../Posts/AddPost";
import { Modal, NavLink } from "reactstrap";

class Modals extends React.Component {
  state = {
    createModal: false
  };
  toggleModal = () => {
    console.log("called BBBBBBB");
    this.setState({
      createModal: !this.state.createModal
    });
  };
  render() {
    return (
      <>
        <NavLink onClick={this.toggleModal}>
          <i className="ni ni-fat-add text-orange" />
          Create Post
        </NavLink>

        {/* Modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.createModal}
          toggle={this.toggleModal}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Create a post
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={this.toggleModal}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <AddPost
              getAllPosts={this.props.postAdded}
              closePopup={this.toggleModal}
            />
          </div>
        </Modal>
      </>
    );
  }
}

export default Modals;

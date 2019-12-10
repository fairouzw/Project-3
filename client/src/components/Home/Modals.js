import React from "react";
import AddPost from '../Posts/AddPost'
// reactstrap components
import {
  Button,
  Modal,
  NavLink
} from "reactstrap";

class Modals extends React.Component {
  state = {
    exampleModal: false
  };
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };
  render() {
    return (
      <>
        {/* Button trigger modal */}
        {/* <Button
          color="primary"
          type="button"
          onClick={() => this.toggleModal("exampleModal")}
        >
          Create a Post
        </Button> */}

        
                <NavLink  onClick={() => this.toggleModal("exampleModal")}>
                  <i className="ni ni-fat-add text-orange" />
                  Create Post
                </NavLink>


        {/* Modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.exampleModal}
          toggle={() => this.toggleModal("exampleModal")}
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
              onClick={() => this.toggleModal("exampleModal")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">

        <AddPost getAllPosts={this.props.postAdded} 
        closePopup={this.toggleModal}
        />
          </div>
          <div className="modal-footer">

         
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("exampleModal")}
            >
              Close
            </Button> 
            <Button color="primary" type="button">
              Save changes
            </Button>
          </div>
        </Modal>
      </>
    );
  }
}

export default Modals;
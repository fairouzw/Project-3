import axios from "axios";
import React, { Component } from "react";
import "../../App.css";
import MessageList from "./MessageList";
import MessageOutList from "./MessageOutList";
import Footer from "../Footer/Footer";
import { Card, CardHeader, Container, Row } from "reactstrap";
class Messages extends Component {
  constructor() {
    super();
    this.state = {
      listOfReceivedMessages: [],
      listOfSentMessages: [],
      filteredListOfMessages: [],
      showMessagePopup: false,
      selectedMessage: null,
    };
  }

  getAllSentMessagesOfLoggedInUser = () => {
    axios.get(`/api/messages/sent`).then((res) => {
      this.setState({
        listOfSentMessages: res.data,
      });
    });
  };

  getAllReceivedMessagesOfLoggedInUser = () => {
    axios.get(`/api/messages/rec`).then((res) => {
      this.setState({
        listOfReceivedMessages: res.data,
        filteredListOfMessages: res.data,
      });
    });
  };

  componentDidMount = () => {
    this.getAllReceivedMessagesOfLoggedInUser();
    this.getAllSentMessagesOfLoggedInUser();
  };
  // searchResultPost = search => {
  //     // const results = postList.filter ... (that's what's actually happening here)
  //     const results = [];
  //     const postList = [...this.state.listOfPosts];
  //     console.log(this.state.listOfPosts)

  //     postList.forEach(p => {

  //         console.log(p.postname)
  //         if (p.postname.toLowerCase().includes(search.toLowerCase())) {
  //             results.push(p)
  //         }
  //     });
  //     this.setState({ filteredListOfPosts: results })
  //     console.log(results)
  // };
  // setSelectedMessage = (message) => {
  //     this.setState({
  //         selectedMessage: message
  //     })
  // }
  render() {
    return (
      <div className="main-content" ref="mainContent">
        <div
          className="header  pb-8 pt-5 pt-md-8"
          style={{
            minHeight: "400px",
            backgroundImage:
              "url(" + require("../Home/icons/imm016_N16.jpg") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        ></div>
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                {this.state.listOfReceivedMessages.length === 0 ? (
                  <h3>You have received no messages so far.</h3>
                ) : (
                  <div>
                    <CardHeader className="border-0">
                      <h3 className="mb-0">My Messages (Inbox)</h3>
                    </CardHeader>
                    <div>
                      <MessageList
                        messages={this.state.listOfReceivedMessages}
                      ></MessageList>
                    </div>
                  </div>
                )}
              </Card>
              <Card className="shadow">
                <br></br>
                {this.state.listOfSentMessages.length === 0 ? (
                  <h3>Yout have no messages in your outbox.</h3>
                ) : (
                  <div>
                    {" "}
                    <CardHeader className="border-0" fgColor="#195D8C">
                      <h3 className="mb-0" fgColor="#195D8C">
                        My Messages (Outbox)
                      </h3>
                    </CardHeader>
                    <div>
                      <MessageOutList
                        messages={this.state.listOfSentMessages}
                      ></MessageOutList>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </Row>
        </Container>
        <Footer> </Footer>
      </div>
    );
  }
}

export default Messages;

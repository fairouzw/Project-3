
import axios from "axios";
import React, { Component } from "react";
import "../../App.css";
import MessageList from "./MessageList";
import MessageOutList from "./MessageOutList";
import Footer from '../Footer/Footer'

import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Container,
    Row,
    Pagination,
    PaginationLink,
    PaginationItem,
    CardFooter
} from "reactstrap";


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
        axios.get(`/api/messages/sent`).then(res => {

            this.setState({
                listOfSentMessages: res.data,
            });
        })
    };

    getAllReceivedMessagesOfLoggedInUser = () => {
        axios.get(`/api/messages/rec`).then(res => {

            this.setState({
                listOfReceivedMessages: res.data,
                filteredListOfMessages: res.data
            });
        })
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
        console.log(this.state.listOfReceivedMessages)
        return (

            <div className="main-content" ref="mainContent">
                {/* <Header /> */}
                <div className="header  pb-8 pt-5 pt-md-8"
                    style={{
                        minHeight: "400px",
                        backgroundImage: "url(" + require("../Home/icons/imm016_N16.jpg") + ")",
                        backgroundSize: "cover",
                        backgroundPosition: "center top"
                    }}></div>
                <Container className="mt--7" fluid>
                    {/* <Row>

                        <Col xl="4">
                            <Card className="bg-gradient-secondary shadow">
                                <CardBody>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row> */}
                    <Row className="mt-5" >
                        <div className="col">
                            <Card className="shadow">
                                {/* <CardHeader className="border-0">
                                    <br />
                                    <h3 className="mb-0"> <SearchPost searchPost={this.searchResultPost} /></h3>
                                </CardHeader> */}
                                <CardBody>

                                    {this.state.listOfReceivedMessages.length == 0 ? <h3 >You have received no messages so far.</h3> :
                                        (<div><CardHeader className="border-0">
                                            <h3 className="mb-0">My Messages (Inbox)</h3>
                                        </CardHeader>

                                            <div>
                                                <MessageList messages={this.state.listOfReceivedMessages} ></MessageList></div></div>)

                                    }

                                    <br></br>
                                    {this.state.listOfSentMessages.length == 0 ? <h3 >You've been writing no wrote no messages so far.</h3> :
                                        (<div> <CardHeader className="border-0" fgColor="#195D8C">
                                            <h3 className="mb-0" fgColor="#195D8C">My Messages (Outbox)</h3>
                                        </CardHeader>

                                            <div>
                                                <MessageOutList messages={this.state.listOfSentMessages} ></MessageOutList>
                                            </div></div>)

                                    }



                                </CardBody>
                                {/* <CardFooter className="py-4">
                                    <nav aria-label="...">
                                        <Pagination
                                            className="pagination justify-content-end mb-0"
                                            listClassName="justify-content-end mb-0"
                                        >
                                            <PaginationItem className="disabled">
                                                <PaginationLink
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                    tabIndex="-1"
                                                >
                                                    <i className="fas fa-angle-left" />
                                                    <span className="sr-only">Previous</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem className="active">
                                                <PaginationLink
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    1
                        </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    2 <span className="sr-only">(current)</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    3
                        </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    <i className="fas fa-angle-right" />
                                                    <span className="sr-only">Next</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                        </Pagination>
                                    </nav>
                                </CardFooter> */}
                            </Card>
                        </div>
                    </Row>
                </Container>
                {/* <footer>Photo by Lena Lau</footer> */}
                {/* ORIGINAL CONTENT */}
<Footer> </Footer>
            </div >
        );
    }
}

export default Messages;




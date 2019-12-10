
import axios from "axios";
import React, { Component } from "react";
import "../../App.css";
import MessageList from "./MessageList";
import MessageOutList from "./MessageOutList";
import Header from "../Home/Header.jsx";

import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
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

                                    <div> <button type="button" className="btn btn-outline-success btn-lg btn-block"><h2>INBOX</h2></button>
                                        <MessageList messages={this.state.listOfReceivedMessages} ></MessageList>
                                    </div>

                                    <div><button type="button" className="btn btn-outline-secondary btn-lg btn-block"><h2>OUTBOX</h2></button>
                                        <MessageOutList messages={this.state.listOfSentMessages} ></MessageOutList>
                                    </div>

                                </CardBody>
                                <CardFooter className="py-4">
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
                                </CardFooter>
                            </Card>
                        </div>
                    </Row>
                </Container>
                {/* ORIGINAL CONTENT */}
                <div className="addPadding">
                    <header className="masthead">
                        <p>The streets are yours.</p>
                        <div className="container h-100 px-lg-5">
                            <div className="row mx-lg-n5">
                                <div className="col-12 col-md-8 py-3 px-lg-5">
                                    {/* this.state.filteredListOfPosts */}
                                </div>
                                <div className="col-6 col-md-4 py-3 px-lg-5">
                                </div>
                            </div>
                        </div>
                    </header>


                </div>
            </div>
        );
    }
}

export default Messages;




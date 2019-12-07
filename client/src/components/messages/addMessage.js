import React, { Component } from "react";
import axios from "axios";
import "../../App.css";
import Header from "../Home/Header.jsx";
import { withRouter, Link } from "react-router-dom";

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

class AddMessage extends Component {

    constructor() {
        super();
        this.state = {
            subject: "",
            content: "",
            recipient: "",
            recipientData: "",

        };
    }

    getRecipientUsername = () => {
        const rec = this.props.match.params.id;
        axios.get(`/api/messages/new-message/${rec}`).then(res => {
            // console.log(res.data);
            /* pagination ?limit=50 */
            this.setState({

                recipientData: res.data,

            });
        })
    };

    componentDidMount() {
        this.getRecipientUsername()
    }

    handleFormSubmit = event => {
        const recId = this.props.match.params.id;
        event.preventDefault();
        console.log("i clicked")
        const { subject, content, recipient } = this.state;
        axios.post(`/api/messages/new-message/${recId}`, {
            subject,
            content,
            recipient: recId
        })
            .then(
                response => {
                    this.setState(
                        {
                            subject: "",
                            content: "",
                            recipient: "",
                        }
                    )


                }

                //     () => {
                //     this.props.getAllMessagesOfLoggedInUser()
                //     this.props.closeMessagePopup(event);
                //     this.setState({
                //         subject: "",
                //         content: ""

                //     })


                //         .catch(error => console.log(error));
                // }
            )
    }

    handleChange = event => {

        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        console.log(this.props.recipient)
        console.log('miR', this.props)
        return (
            <div className="main-content" ref="mainContent">
                <Header />
                <Container className="mt--7" fluid>
                    <Row>

                        <Col xl="4">
                            <Card className="bg-gradient-secondary shadow">
                                <h1>Send Message to {this.state.recipientData.username} </h1>
                                <CardBody>
                                    <div className="container">
                                        <div className="row">
                                            <form onSubmit={this.handleFormSubmit}>
                                                <label htmlFor="inputEmail">Subject</label>
                                                <div className="form-label-group">
                                                    <input
                                                        type="text"
                                                        id="inputEmail"
                                                        className="form-control"
                                                        placeholder="subject"
                                                        name="subject"
                                                        value={this.state.subject}
                                                        onChange={this.handleChange}
                                                        required
                                                    // autoFocus
                                                    />
                                                </div>

                                                <label htmlFor="inputEmail">Content</label>
                                                <div className="form-label-group">
                                                    <input
                                                        type="textarea"
                                                        id="inputEmail"
                                                        className="form-control"
                                                        placeholder="your message comes here"
                                                        name="content"
                                                        value={this.state.content}
                                                        onChange={this.handleChange}
                                                        required
                                                    // autoFocus
                                                    />
                                                </div>

                                                <br />
                                                <button
                                                    className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                                                    type="submit"

                                                >
                                                    SEND
            </button>
                                                <div className="text-center"></div>
                                            </form>

                                            <Link to={`/home`} ><p><span className="owner"> Back Home</span></p></Link>
                                            <br></br>
                                            <Link to={`/messages`} ><p><span className="owner"> Back to Messages</span></p></Link>

                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>

            </div>

        );
    }
}

export default withRouter(AddMessage);

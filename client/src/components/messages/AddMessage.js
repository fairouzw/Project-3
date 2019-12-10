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

import {
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,


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
                <Container className="mt--7" fluid style={{ justifyContent: "center" }}>
                    <Row>

                        <Col xl="8">
                            <Card className="bg-gradient-secondary shadow">
                                <h3>Send Message to {this.state.recipientData.username} </h3>
                                <CardBody style={{ justifyContent: "center" }}>
                                    <div className="container">
                                        <div className="row">

                                            <form onSubmit={this.handleFormSubmit}>
                                                <div className="text-center">
                                                    <Col md="50" style={{ justifyContent: "center" }}>
                                                        <label htmlFor="subject"></label>
                                                        <FormGroup style={{ justifyContent: "center" }}>
                                                            <Input
                                                                id="subject"
                                                                placeholder="subject"
                                                                type="text"
                                                                name="subject"
                                                                value={this.state.subject}
                                                                onChange={this.handleChange}
                                                                required

                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="50" style={{ justifyContent: "center" }}>
                                                        <label htmlFor="content">Content:</label>
                                                        <FormGroup>
                                                            <div className="form-label-group">
                                                                <Input
                                                                    id="content"
                                                                    placeholder="your text"
                                                                    type="textarea"
                                                                    name="content"
                                                                    value={this.state.content}
                                                                    onChange={this.handleChange}
                                                                    required

                                                                />
                                                            </div>
                                                        </FormGroup>
                                                    </Col>

                                                    <br />
                                                    <button
                                                        className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                                                        type="submit"

                                                    >
                                                        SEND
            </button>


                                                    <Link to={`/home`} ><p><span className="owner"> Back Home</span></p></Link>
                                                    <br></br>
                                                    <Link to={`/messages`} ><p><span className="owner"> Back to Messages</span></p></Link>
                                                </div>
                                            </form>



                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        {/* <>
                            <Form>
                                <Row>
                                    <Col md="6">
                                        <FormGroup>
                                            <Input
                                                id="exampleFormControlInput1"
                                                placeholder="name@example.com"
                                                type="email"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="6">
                                        <FormGroup>
                                            <Input disabled placeholder="Regular" type="textarea" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="6">
                                        <FormGroup>
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-zoom-split-in" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input placeholder="Search" type="text" />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col md="6">
                                        <FormGroup>
                                            <InputGroup className="mb-4">
                                                <Input placeholder="Birthday" type="text" />
                                                <InputGroupAddon addonType="append">
                                                    <InputGroupText>
                                                        <i className="ni ni-zoom-split-in" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="6">
                                        <FormGroup className="has-success">
                                            <Input
                                                className="is-valid"
                                                placeholder="Success"
                                                type="text"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="6">
                                        <FormGroup className="has-danger">
                                            <Input
                                                className="is-invalid"
                                                placeholder="Error Input"
                                                type="email"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>
                        </> */}


                    </Row>
                </Container>

            </div>

        );
    }
}

export default withRouter(AddMessage);

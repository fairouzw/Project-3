import React, { Component } from 'react'
import "../../App.css";
import DisplayPost from '../Posts/DisplayPost'
import Header from "../Home/Header";
import FavMap from './FavMap';

import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  
} from "reactstrap";

 class PostDetails extends Component {
  constructor() {
    super();
    this.state = {
      listOfPosts: [],
      filteredListOfPosts: [],
      showPopup: false,
      selectedPost: null
    };
  }
  render() {
    return (
      <div className="main-content" ref="mainContent">
    <Header />
 <Container className="mt--7" fluid>
 <Row>
   <Col className="mb-5 mb-xl-0" xl="8">
     <Card className="bg-gradient-secondary shadow">
         {/* MAP */}
         <div className="chart">
          <FavMap setSelectedPost={this.setSelectedPost} selectedPost={this.state.selectedPost} posts={this.state.filteredListOfPosts} />
         </div>
     </Card>
   </Col>
   <Col xl="4">
     <Card className="bg-gradient-secondary shadow">
       <CardBody>
         {/* DISPLAYED POST */}
         <div className="chart">
  {this.state.selectedPost ?  <DisplayPost selectedPost={this.state.selectedPost} /> : 
  <p> Select something on the map/Display an image/show something</p>
  }

         </div>
       </CardBody>
     </Card>
   </Col>
 </Row>
 </Container>
  </div>
    )
  }
}

export default PostDetails
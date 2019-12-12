import React, { Component } from 'react'
import Header from '../Home/Header'
import axios from 'axios'
import SingleFavPost from "./SingleFavPost"
import Footer from '../Footer/Footer'
// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Container,
  Row
} from "reactstrap";

class MyFavourites extends Component {
  constructor() {
    super();
    this.state = {
      listOfPosts: [],
    };
  }

  getAllPosts = () => {
    axios.get(`/api/posts`).then(res => {
      console.log("hello")
      // console.log(res.data);
      /* pagination ?limit=50 */
      this.setState({
        listOfPosts: res.data,
      });
    })
  };

  componentDidMount = () => {
    this.getAllPosts();
  };


  render() {
    return (
      <div className="main-content" ref="mainContent" >
        {/* <Header /> */}
        <div
          className="header  pb-8 pt-5 pt-md-8"
          style={{
            minHeight: "400px",
            backgroundImage:
              "url(" +
              require("../Home/icons/eric-ward-P6NhhvGIL9k-unsplash.jpg") +
              ")",
            backgroundSize: "cover",
            backgroundPosition: "center top"
          }}
        ></div>
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row className="mt-5">
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">My Favourites</h3>
                </CardHeader>
                <CardBody>
                    {this.state.listOfPosts.length === 0 ? <h4>You haven't liked anything yet.</h4> : 
                  <Row style={{ justifyContent: "center" }}>
                    {this.state.listOfPosts.map((post, idx) => {
                      if (post.hasLiked) {
                        return (

                          <SingleFavPost key={idx} post={post} getAllPosts={this.getAllPosts} />

                        )
                      } else {
                      }
                    })}

                  </Row>
                  }
                </CardBody>
                <CardFooter className="py-4">
                
                </CardFooter>
              </Card>
            </div>
          </Row>

        </Container>
        <Footer></Footer>
        {/* <footer>Photo by Eric Ward</footer> */}
      </div>

    )
  }
}

export default MyFavourites;
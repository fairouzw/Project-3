import React, { Component } from 'react'
import Header from '../Home/Header'
import axios from 'axios'
import SingleFavPost from "./SingleFavPost"
// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Pagination,
  PaginationItem,
  PaginationLink,
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
        <div className="header  pb-8 pt-5 pt-md-8"
          style={{
            minHeight: "400px",
            backgroundImage: "url(" + require("../Home/icons/myfav.jpg") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center top"
          }}></div>
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row className="mt-5">
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <button type="button" className="btn btn-danger btn-lg btn-block"> <h3 className="mb-0">My Favourites</h3></button>
                </CardHeader>
                <CardBody>
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
        <footer>Photo by Anastase Maragos on Unsplash</footer>
      </div>

    )
  }
}

export default MyFavourites;
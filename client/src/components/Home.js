import React, { Component } from "react";
import "../App.css";
import Map from "./Map";
import axios from "axios";
import PostList from "./PostList";
import SearchPost from "./SearchPost";
import Popup from "./PopUp"

// node.js library that concatenates classes (strings)
// import classnames from "classnames";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

import Header from "./Header.jsx";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      listOfPosts: [],
      filteredListOfPosts: [],
      showPopup: false
    };
  }

  getAllPosts = () => {
    axios.get(`/api/posts`).then(res => {
      // console.log(res.data);
      /* pagination ?limit=50 */
      this.setState({
        listOfPosts: res.data,
        filteredListOfPosts: res.data
      });
    })
  };

  componentDidMount = () => {
    this.getAllPosts();
  };

  searchResultPost = search => {

    // const results = postList.filter ... (that's what's actually happening here)
    const results = [];
    const postList = [...this.state.listOfPosts];
    console.log(this.state.listOfPosts)

    postList.forEach(p => {
      console.log(p.postname)
      if (p.postname.toLowerCase().includes(search.toLowerCase())) {
        results.push(p)
      }
    });

    this.setState({ filteredListOfPosts: results })
    console.log(results)
  };

  togglePopup = event => {
    event.preventDefault();
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  render() {
    return (
      <div className="main-content" ref="mainContent">
    <Header />
 <Container className="mt--7" fluid>
 <Row>
   <Col className="mb-5 mb-xl-0" xl="8">
     <Card className="bg-gradient-default shadow">
       <CardHeader className="bg-transparent">
         <Row className="align-items-center">
           <div className="col">
             <h6 className="text-uppercase text-light ls-1 mb-1">
               Overview
             </h6>
             <h2 className="text-white mb-0">Map Title</h2>
           </div>
           <div className="col">
             <Nav className="justify-content-end" pills>
               {/* <NavItem>
                 <NavLink
                   className={classnames("py-2 px-3", {
                     active: this.state.activeNav === 1
                   })}
                   href="#pablo"
                   onClick={e => this.toggleNavs(e, 1)}
                 >
                   <span className="d-none d-md-block">Month</span>
                   <span className="d-md-none">M</span>
                 </NavLink>
               </NavItem>
               <NavItem>
                 <NavLink
                   className={classnames("py-2 px-3", {
                     active: this.state.activeNav === 2
                   })}
                   data-toggle="tab"
                   href="#pablo"
                   onClick={e => this.toggleNavs(e, 2)}
                 >
                   <span className="d-none d-md-block">Week</span>
                   <span className="d-md-none">W</span>
                 </NavLink>
               </NavItem> */}
             </Nav>
           </div>
         </Row>
       </CardHeader>
       <CardBody>
         {/* Chart */}
         <div className="chart">
          <Map posts={this.state.filteredListOfPosts} />
         </div>
       </CardBody>
     </Card>
   </Col>
   <Col xl="4">
     <Card className="shadow">
       <CardHeader className="bg-transparent">
         <Row className="align-items-center">
           <div className="col">
             <h6 className="text-uppercase text-muted ls-1 mb-1">
               Performance
             </h6>
             <h2 className="mb-0">Total orders</h2>
           </div>
         </Row>
       </CardHeader>
       <CardBody>
         {/* Chart */}
         <div className="chart">
           {/* <Bar
             data={chartExample2.data}
             options={chartExample2.options}
           /> */}
         </div>
       </CardBody>
     </Card>
   </Col>
 </Row>
 <Row className="mt-5">
   <Col className="mb-5 mb-xl-0" xl="8">
     <Card className="shadow">
       <CardHeader className="border-0">
         <Row className="align-items-center">
           <div className="col">
             <h3 className="mb-0">Page visits</h3>
           </div>
           <div className="col text-right">
             <Button
               color="primary"
               href="#pablo"
               onClick={e => e.preventDefault()}
               size="sm"
             >
               See all
             </Button>
           </div>
         </Row>
       </CardHeader>
       <Table className="align-items-center table-flush" responsive>
         <thead className="thead-light">
           <tr>
             <th scope="col">Page name</th>
             <th scope="col">Visitors</th>
             <th scope="col">Unique users</th>
             <th scope="col">Bounce rate</th>
           </tr>
         </thead>
         <tbody>
           <tr>
             <th scope="row">/argon/</th>
             <td>4,569</td>
             <td>340</td>
             <td>
               <i className="fas fa-arrow-up text-success mr-3" />{" "}
               46,53%
             </td>
           </tr>
           <tr>
             <th scope="row">/argon/index.html</th>
             <td>3,985</td>
             <td>319</td>
             <td>
               <i className="fas fa-arrow-down text-warning mr-3" />{" "}
               46,53%
             </td>
           </tr>
           <tr>
             <th scope="row">/argon/charts.html</th>
             <td>3,513</td>
             <td>294</td>
             <td>
               <i className="fas fa-arrow-down text-warning mr-3" />{" "}
               36,49%
             </td>
           </tr>
           <tr>
             <th scope="row">/argon/tables.html</th>
             <td>2,050</td>
             <td>147</td>
             <td>
               <i className="fas fa-arrow-up text-success mr-3" />{" "}
               50,87%
             </td>
           </tr>
           <tr>
             <th scope="row">/argon/profile.html</th>
             <td>1,795</td>
             <td>190</td>
             <td>
               <i className="fas fa-arrow-down text-danger mr-3" />{" "}
               46,53%
             </td>
           </tr>
         </tbody>
       </Table>
     </Card>
   </Col>
   <Col xl="4">
     <Card className="shadow">
       <CardHeader className="border-0">
         <Row className="align-items-center">
           <div className="col">
             <h3 className="mb-0">Social traffic</h3>
           </div>
           <div className="col text-right">
             <Button
               color="primary"
               href="#pablo"
               onClick={e => e.preventDefault()}
               size="sm"
             >
               See all
             </Button>
           </div>
         </Row>
       </CardHeader>
       <Table className="align-items-center table-flush" responsive>
         <thead className="thead-light">
           <tr>
             <th scope="col">Referral</th>
             <th scope="col">Visitors</th>
             <th scope="col" />
           </tr>
         </thead>
         <tbody>
           <tr>
             <th scope="row">Facebook</th>
             <td>1,480</td>
             <td>
               <div className="d-flex align-items-center">
                 <span className="mr-2">60%</span>
                 <div>
                   <Progress
                     max="100"
                     value="60"
                     barClassName="bg-gradient-danger"
                   />
                 </div>
               </div>
             </td>
           </tr>
           <tr>
             <th scope="row">Facebook</th>
             <td>5,480</td>
             <td>
               <div className="d-flex align-items-center">
                 <span className="mr-2">70%</span>
                 <div>
                   <Progress
                     max="100"
                     value="70"
                     barClassName="bg-gradient-success"
                   />
                 </div>
               </div>
             </td>
           </tr>
           <tr>
             <th scope="row">Google</th>
             <td>4,807</td>
             <td>
               <div className="d-flex align-items-center">
                 <span className="mr-2">80%</span>
                 <div>
                   <Progress max="100" value="80" />
                 </div>
               </div>
             </td>
           </tr>
           <tr>
             <th scope="row">Instagram</th>
             <td>3,678</td>
             <td>
               <div className="d-flex align-items-center">
                 <span className="mr-2">75%</span>
                 <div>
                   <Progress
                     max="100"
                     value="75"
                     barClassName="bg-gradient-info"
                   />
                 </div>
               </div>
             </td>
           </tr>
           <tr>
             <th scope="row">twitter</th>
             <td>2,645</td>
             <td>
               <div className="d-flex align-items-center">
                 <span className="mr-2">30%</span>
                 <div>
                   <Progress
                     max="100"
                     value="30"
                     barClassName="bg-gradient-warning"
                   />
                 </div>
               </div>
             </td>
           </tr>
         </tbody>
       </Table>
     </Card>
   </Col>
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
        <div className='popup-button'>
          <h1>Add Post</h1>
          <button onClick={this.togglePopup}>show popup</button>
          {this.state.showPopup ?
            <Popup
              posts={this.state.listOfPosts}
              text='Your next post:'
              closePopup={this.togglePopup}
              getAllPosts={this.getAllPosts}
            />
            : null
          }
        </div>
        <section className="py-5">
          <div className="container">
            <h2 className="font-weight-light">
              <div>
                <SearchPost searchPost={this.searchResultPost} />
              </div>
              <div>
                <PostList posts={this.state.filteredListOfPosts} ></PostList>
              </div>
            </h2>
          </div>
        </section>

      </div>
      </div>
    );
  }
}

export default Home;


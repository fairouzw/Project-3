import axios from "axios";

export const getAllUserPosts = () => dispatch => {

  axios.get(" https://swapi.co/api/people").then(
    res => dispatch({
      type: "GET_STARWARS",
      payload: res.data
    }) 
  )

}

getAllUserPosts = () => {
  axios.get(`/api/posts?owner_id=${this.props.userData._id}`).then(res => {
    this.setState({
      listOfPosts: res.data,
    });
    // this.getLikesNumber(res.data);
  })
}

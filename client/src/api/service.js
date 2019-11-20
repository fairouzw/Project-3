import axios from "axios";

const service = axios.create({
  baseURL: "/api"
  // withCredentials: true // => you might need this when having the users in the app
});

const errorHandler = err => {
  // console.error(err);
  throw err;
};

export default {
  service,

  handleUpload(theFile) {
    // console.log('file in service: ', theFile)
    return service
      .post("/upload", theFile)
      .then(res => res.data)
      .catch(errorHandler);
  },

  saveNewThing(newPost) {
    // console.log('new thing is: ', newPost)
    return service
      .post("/posts/new-post", newPost)
      .then(res => res.data)
      .catch(errorHandler);
  }
};

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

document.getElementById("root").innerText =
  "The React app has not connected to the backend yet.";

axios
  .get("/api/checkuser")
  .then(res => {
    ReactDOM.render(
      <BrowserRouter>
        <App user={res.data.userDoc} />
      </BrowserRouter>,
      document.getElementById("root")
    );
  })
  .catch(err => {
    alert("backend not running or /checkuser route not defined !");
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

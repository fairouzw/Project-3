import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../src/assets/vendor/nucleo/css/nucleo.css";
import "../src/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import {Spinner} from 'spin.js';

var opts = {
  lines: 17, // The number of lines to draw
  length: 61, // The length of each line
  width: 14, // The line thickness
  radius: 47, // The radius of the inner circle
  scale: 0.55, // Scales overall size of the spinner
  corners: 0.5, // Corner roundness (0..1)
  color: '#3f61ff', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  speed: 1, // Rounds per second
  rotate: 0, // The rotation offset
  animation: 'spinner-line-shrink', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  className: 'spinner', // The CSS class to assign to the spinner
  top: '50%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  position: 'absolute' // Element positioning
};

var target = document.getElementById('root');
var spinner = new Spinner(opts).spin(target);
// var spinner = new Spinner().spin();
target.appendChild(spinner.el);
// document.getElementById("root").innerText =
//   "Loading...";

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
    console.log("backend not running or /checkuser route not defined !");
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

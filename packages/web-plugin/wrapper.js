import ReactDOM from 'react-dom';
import React from 'react';
import App from "./src/App";

let kudosApp = {

  showWidget: (domElement) => {
    ReactDOM.render(<App />, domElement);
  },

  showAppWithProperty: (domElement) => {
    ReactDOM.render(<App someParameter="go"/>, domElement);
  },
};

module.exports = kudosApp;



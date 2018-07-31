import ReactDOM from 'react-dom';
import React from 'react';
import App from "./src/App";

let boomerangApp = {

  rateExperience: (data, signature, domElement) => {
    ReactDOM.render(<App data={data} signature={signature} />, domElement);
  },
};

module.exports = boomerangApp;



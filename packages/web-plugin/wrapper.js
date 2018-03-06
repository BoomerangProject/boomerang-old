import ReactDOM from 'react-dom';
import React from 'react';
import App from "./src/App";

const showRatingComponent = (element) => {
  ReactDOM.render(<App />, element);
};

module.exports = showRatingComponent;

import ReactDOM from 'react-dom';
import React from 'react';
import App from "./src/App";

const showWidget = (domElement) => {
  ReactDOM.render(<App/>, domElement);
};

module.exports = showWidget;
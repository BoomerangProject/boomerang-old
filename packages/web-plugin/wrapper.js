import ReactDOM from 'react-dom';
import React from 'react';
import App from "./src/App";

const showWidget = (element) => {
  ReactDOM.render(<App />, element);
};

module.exports = showWidget;

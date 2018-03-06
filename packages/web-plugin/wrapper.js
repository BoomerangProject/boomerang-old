import ReactDOM from 'react-dom';
import React from 'react';
import RatingComponent from "./src/RatingComponent";

const showRatingComponent = (element) => {
  ReactDOM.render(<RatingComponent />, element);
};

module.exports = showRatingComponent;

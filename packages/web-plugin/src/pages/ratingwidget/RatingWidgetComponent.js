import React, { Component } from 'react';
import {default as Stars} from "react-rating";
import { withRouter } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";

class RatingComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.setTitle(this.props.data.firstName);
  }

  setTitle(firstName) {

    if (firstName == null) {
      this.title = "rate your last experience";
    } else {
      this.title = "rate your experience with " + firstName;
    }
  }

  onChangeOfRating(ratingValue) {
    this.setState({rating: ratingValue});
    this.props.history.push("/ratingModalContainer", {rating: ratingValue});
  }

  render() {

    return (

      <div className="RatingWidgetComponent container">

        <div className="RatingWidgetComponent space">
        </div>

        <div className="RatingWidgetComponent title">
          {this.title}
        </div>

        <div className="RatingWidgetComponent starsDiv">
          <Stars
            initialRating={this.state.rating}
            emptySymbol="fa fa-star-o starsEmpty"
            fullSymbol="fa fa-star starsFull"
            onChange={this.onChangeOfRating.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default withRouter(RatingComponent);

import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import onClickOutside from "react-onclickoutside";

class RatingModalComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      rating: this.props.location.state.rating
    };
  }

  handleClickOutside(evt) {
    console.log('onClickOutside() method called')
  }

  onChangeOfRating(ratingValue) {
    this.setState({rating: ratingValue});
  }

  render() {

    return (

      <div className="RatingModalComponent container">

        <div className="RatingModalComponent title">
          the detail page -- {this.state.rating} stars
        </div>
      </div>
    );
  }
}

export default withRouter(onClickOutside(RatingModalComponent));

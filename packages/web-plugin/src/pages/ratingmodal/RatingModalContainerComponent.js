import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import RatingModalComponent from "./RatingModalComponent";

class RatingModalContainerComponent extends Component {

  constructor(props) {
    super(props);
    this.expandIframe();

    console.log(JSON.stringify(this.props));

    this.state = {
      rating: this.props.rating
    };
  }

  expandIframe() {
    window.parent.document.getElementById('boomerangIframe').width = '100%';
    window.parent.document.getElementById('boomerangIframe').height = '100%';
    window.parent.document.getElementById('boomerangIframe').style.marginLeft = '0';
  }

  render() {

    return (

      <RatingModalComponent rating={this.state.rating}/>
    );
  }
}

export default withRouter(RatingModalContainerComponent);

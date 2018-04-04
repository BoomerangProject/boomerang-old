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
    window.parent.document.getElementById('kudosIframe').width = '100%';
    window.parent.document.getElementById('kudosIframe').height = '100%';
    window.parent.document.getElementById('kudosIframe').style.marginLeft = '0';
  }

  render() {

    return (

      <RatingModalComponent rating={this.state.rating}/>
    );
  }
}

export default withRouter(RatingModalContainerComponent);

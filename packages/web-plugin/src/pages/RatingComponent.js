import React, { Component } from 'react';
import Rating from "react-rating";
import "font-awesome/css/font-awesome.min.css";
// import "./src/someCss.css";

const divStyle = {
  border: "1px solid black",
  width: 500,
  padding: 10,
  margin: 25
};

const textAreaStyle = {
  border: "1px solid black",
  width: 300,
  height: 50
};

class RatingComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      workerRatingValue: this.props.workerRating,
      workerReviewTextValue: this.props.workerReviewText,
      businessRatingValue: this.props.businessRating,
      businessReviewTextValue: this.props.businessReviewText
    };
  }

  onChangeOfWorkerRating(ratingValue) {
    this.setState({workerRatingValue: ratingValue});
  }

  onChangeOfWorkerReviewText(event) {
    this.setState({workerReviewTextValue: event.target.value});
  }

  onChangeOfBusinessRating(ratingValue) {
    this.setState({businessRatingValue: ratingValue});
  }

  onChangeOfBusinessReviewText(event) {
    this.setState({businessReviewTextValue: event.target.value});
  }

  updateReview(workerRatingValue, workerReviewTextValue, businessRatingValue, businessReviewTextValue) {
    alert("worker rating: " + workerRatingValue + "\n" +
      "worker review: " + workerReviewTextValue + "\n" +
      "business rating: " + businessRatingValue + "\n" +
      "business review: " + businessReviewTextValue);
  }

  render() {

    return (

      <div style={divStyle}>

        <table>
          <tbody>
          <tr>
            <th>Worker</th>
          </tr>
          <tr>
            <td>
              <Rating emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x"
                      initialRating={this.state.workerRatingValue}
                      onChange={this.onChangeOfWorkerRating.bind(this)}/>
            </td>
            <td>
              <textarea style={textAreaStyle} onChange={this.onChangeOfWorkerReviewText.bind(this)}/>
            </td>
          </tr>
          </tbody>
        </table>

        <br/>
        <br/>

        <table>
          <tbody>
          <tr>
            <th>Business</th>
          </tr>
          <tr>
            <td>
              <Rating emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x"
                      initialRating={this.state.businessRatingValue}
                      onChange={this.onChangeOfBusinessRating.bind(this)}/>
            </td>
            <td>
              <textarea style={textAreaStyle} onChange={this.onChangeOfBusinessReviewText.bind(this)}/>
            </td>
          </tr>
          </tbody>
        </table>

        <br/>

        <div style={{textAlign: "center"}}>
          <button style={{width: 200, height: 50}} onClick={() => this.updateReview(this.state.workerRatingValue,
            this.state.workerReviewTextValue,
            this.state.businessRatingValue,
            this.state.businessReviewTextValue)}>submit
          </button>
        </div>



      </div>
    );
  }
}

export default RatingComponent;

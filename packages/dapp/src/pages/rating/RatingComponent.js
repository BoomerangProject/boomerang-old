import React, { Component } from 'react';

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

  onChangeOfWorkerRating(event) {
    this.setState({workerRatingValue: event.target.value});
  }

  onChangeOfWorkerReviewText(event) {
    this.setState({workerReviewTextValue: event.target.value});
  }

  onChangeOfBusinessRating(event) {
    this.setState({businessRatingValue: event.target.value});
  }

  onChangeOfBusinessReviewText(event) {
    this.setState({businessReviewTextValue: event.target.value});
  }

  updateReview(workerRatingValue, workerReviewTextValue, businessRatingValue, businessReviewTextValue) {
    alert(workerRatingValue + workerReviewTextValue + businessRatingValue + businessReviewTextValue);
  }

  render() {

    return (

      <div>
        <h3>Rating Page</h3>
        <br/>
        worker
        <br/>
        <br/>
        <div onChange={this.onChangeOfWorkerRating.bind(this)}>
          &nbsp;1&nbsp;&nbsp;&nbsp;2&nbsp;&nbsp;3&nbsp;&nbsp;4&nbsp;&nbsp;&nbsp;5<br/>
          <input type="radio" value="1" name="workerRating"/>
          <input type="radio" value="2" name="workerRating"/>
          <input type="radio" value="3" name="workerRating"/>
          <input type="radio" value="4" name="workerRating"/>
          <input type="radio" value="5" name="workerRating"/>
        </div>
        <br/>
        <textarea style={{width: 200, height: 100}}
                  onChange={this.onChangeOfWorkerReviewText.bind(this)}/>
        <br/>
        <br/>
        business
        <br/>
        <br/>
        <div onChange={this.onChangeOfBusinessRating.bind(this)}>
          &nbsp;1&nbsp;&nbsp;&nbsp;2&nbsp;&nbsp;3&nbsp;&nbsp;4&nbsp;&nbsp;&nbsp;5<br/>
          <input type="radio" value="1" name="businessRating"/>
          <input type="radio" value="2" name="businessRating"/>
          <input type="radio" value="3" name="businessRating"/>
          <input type="radio" value="4" name="businessRating"/>
          <input type="radio" value="5" name="businessRating"/>
        </div>
        <br/>
        <textarea style={{width: 200, height: 100}}
                  onChange={this.onChangeOfBusinessReviewText.bind(this)}/>
        <br/>
        <br/>
        <button onClick={() => this.updateReview( this.state.workerRatingValue,
                                                        this.state.workerReviewTextValue,
                                                        this.state.businessRatingValue,
                                                        this.state.businessReviewTextValue)}>submit</button>
      </div>
    );
  }
}

export default RatingComponent;

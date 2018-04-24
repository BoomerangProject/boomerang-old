// import ReviewsContractService from '../services/ReviewsContractService';
// import ReviewsFileService from '../services/ReviewsFileService';

export function storeContractData(rating, reviewText) {

  return {
    type: "STORE_CONTRACT_DATA",
    rating: rating,
    reviewText: reviewText
  }
}

export const fetchContractData = () => {

  return async dispatch => {

    dispatch(showProgressIndicator());

    try {

      // const rating = await ReviewsContractService.getRating();
      // const reviewText = await ReviewsContractService.getReviewText();
      // dispatch(storeContractData(rating, reviewText));

    } catch (error) {
      console.log("ERROR");
      console.log(error);
      alert(error.message);
    }

    dispatch(hideProgressIndicator());
  };
};

export const storeReview = (rating, reviewText) => {

  return async dispatch => {

    dispatch(showProgressIndicator());

    try {

      // const item = await ReviewsFileService.storeReview(rating, reviewText).then(function(result) {
      //
      // console.log(result);
      //
      //
      // });
      dispatch(storeContractData(rating, reviewText));

    } catch (error) {
      console.log(error);
      alert(error.message);
    }

    dispatch(hideProgressIndicator());
  };
};

export const storeReviewOnContract = (rating, reviewText) => {

  return async dispatch => {

    dispatch(showProgressIndicator());

    try {
      // const item = await ReviewsContractService.storeReview(rating, reviewText).then(function(result) {
      //   // result object contains import information about the transaction
      //   console.log(result);
      // });
      dispatch(storeContractData(rating, reviewText));

    } catch (error) {
      console.log(error);
      alert(error.message);
    }

    dispatch(hideProgressIndicator());
  };
};

export function showProgressIndicator() {

  return {
    type: "SHOW_PROGRESS_INDICATOR"
  }
}

export function hideProgressIndicator() {

  return {
    type: "HIDE_PROGRESS_INDICATOR"
  }
}
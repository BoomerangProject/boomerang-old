const initialState = {

  rating: 3,
  reviewText: "it was okay"
};

export default function mainReducer(state=initialState, action) {

  switch (action.type) {

    case "STORE_CONTRACT_DATA":
      return {
        ...state,
        rating: action.rating,
        reviewText: action.reviewText
      };
    default:
      return {...state};
  }
}
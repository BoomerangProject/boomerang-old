import contract from "truffle-contract";
import ReviewsContractJson from "kudos-contracts/build/contracts/Reviews.json";
import provider from "../web3/Web3Provider";

const ReviewsContract = contract(ReviewsContractJson);
ReviewsContract.setProvider(provider);

class ReviewsContractService {

  async getInstance() {

    const instance = await ReviewsContract.deployed();
    return instance;
  }

  async getReviewText() {
    const instance = await this.getInstance();
    return await instance.reviewText();
  }

  async getRating() {
    const instance = await this.getInstance();
    const rating = await instance.rating();
    return Number(rating);
  }

  async storeReview(rating, reviewText) {

    const instance = await this.getInstance();
    const item = await instance.storeReview(rating, reviewText, { from: "0xdcee2f1da7262362a962d456280a928f4f90bb5e" });
    // return item.receipt.from;
    return item;
  }
}

export default new ReviewsContractService();

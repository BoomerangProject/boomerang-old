import IPFS from "ipfs-mini";

const ipfs = new IPFS({ host: "ipfs.infura.io", port: 5001, protocol: "https" });

class ReviewsFileService {

  async getReview(arg) {



  }

  async storeReview(rating, reviewText) {

    const review = { rating, reviewText };

    ipfs.addJSON(review, (err, result) => {
      console.log(err, result);
      return result;
    });
  }
}

export default new ReviewsFileService();

import addPendingReview from "./addPendingReview";
import getNonceForAddingUserToRegistry from "./getNonceForAddingUserToRegistry";
import incrementNonceForAddingUserToRegistry from "./incrementNonceForAddingUserToRegistry";

const database = {

  addPendingReview,
  getNonceForAddingUserToRegistry,
  incrementNonceForAddingUserToRegistry,
};

export default database;
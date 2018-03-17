import addPendingReview from "./addPendingReviewDao";
import getNonceForUpdatingRegistry from "./registry/getNonceForUpdatingRegistryDao";
import incrementNonceForUpdatingRegistry from "./registry/incrementNonceForUpdatingRegistryDao";
import putInRegistry from "./registry/putInRegistryDao";
import deleteFromRegistry from "./registry/deleteFromRegistryDao";

const database = {

  addPendingReview,
  getNonceForUpdatingRegistry,
  incrementNonceForUpdatingRegistry,
  putInRegistry,
  deleteFromRegistry,
};

export default database;
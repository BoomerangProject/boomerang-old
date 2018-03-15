'use strict';
import getSignature from "./functions/getSignature";
import rateExperience from "./functions/reviews/rateExperience";
import storeExperience from "./functions/reviews/storeExperience";
import requestReview from "./functions/reviewrequests/requestReview";
import getPendingReviews from "./functions/reviewrequests/getPendingReviews";
import addUserToRegistry from "./functions/registry/addUserToRegistry";
import getNonceForAddingUserToRegistry from "./functions/registry/getNonceForAddingUserToRegistry";
import getUserAddress from "./functions/registry/getUserAddress";

module.exports.getSignature = getSignature;
module.exports.rateExperience = rateExperience;
module.exports.storeExperience = storeExperience;
module.exports.requestReview = requestReview;
module.exports.getPendingReviews = getPendingReviews;
module.exports.addUserToRegistry = addUserToRegistry;
module.exports.getUserAddress = getUserAddress;
module.exports.getNonceForAddingUserToRegistry = getNonceForAddingUserToRegistry;

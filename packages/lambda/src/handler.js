'use strict';
import getNonceValue from "./functions/getNonceValue";
import rateExperience from "./functions/reviews/rateExperience";
import storeExperience from "./functions/reviews/storeReview";
import requestReview from "./functions/reviewrequests/requestReview";
import getPendingReviews from "./functions/reviewrequests/getPendingReviews";
import updateRegistry from "./functions/registry/updateRegistry";
import getNonceForUpdatingRegistry from "./functions/registry/getNonceForUpdatingRegistry";
import getUserAddress from "./functions/registry/getUserAddress";

module.exports.getNonceValue = getNonceValue;
module.exports.rateExperience = rateExperience;
module.exports.storeExperience = storeExperience;
module.exports.requestReview = requestReview;
module.exports.getPendingReviews = getPendingReviews;
module.exports.updateRegistry = updateRegistry;
module.exports.getUserAddress = getUserAddress;
module.exports.getNonceForUpdatingRegistry = getNonceForUpdatingRegistry;

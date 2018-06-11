import WriteRequester from './WriteRequester';

export default class RegisterAsBusinessRequester extends WriteRequester {

  constructor(businessAddress, businessName, businessDescription) {

    const apiMethod = '/registerAsBusiness';

    const apiMethodParameters = {
      businessAddress: businessAddress,
      businessName: businessName,
      businessDescription: businessDescription

    };

    super(apiMethod, apiMethodParameters);
  }
}
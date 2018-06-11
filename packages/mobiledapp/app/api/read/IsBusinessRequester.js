import KudosReadRequester from "./KudosReadRequester";

export default class IsBusinessRequester extends KudosReadRequester {

  constructor(address) {

    const apiMethod = 'isBusiness';
    const apiMethodParameters = [address];

    super(apiMethod, apiMethodParameters);
  }
}
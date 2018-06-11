import KudosTokenReadRequester from "./KudosTokenReadRequester";

export default class KudosBalanceRequester extends KudosTokenReadRequester {

  constructor(address) {

    const apiMethod = 'balanceOf';
    const apiMethodParameters = [address];

    super(apiMethod, apiMethodParameters);
  }
}
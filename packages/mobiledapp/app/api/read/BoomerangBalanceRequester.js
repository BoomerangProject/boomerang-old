import BoomerangTokenReadRequester from './BoomerangTokenReadRequester';

export default class BoomerangBalanceRequester extends BoomerangTokenReadRequester {

  constructor(address) {

    const apiMethod = 'balanceOf';
    const apiMethodParameters = [address];

    super(apiMethod, apiMethodParameters);
  }
}
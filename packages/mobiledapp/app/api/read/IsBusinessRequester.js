import BoomerangReadRequester from './BoomerangReadRequester';

export default class IsBusinessRequester extends BoomerangReadRequester {

  constructor(address) {

    const apiMethod = 'isBusiness';
    const apiMethodParameters = [address];

    super(apiMethod, apiMethodParameters);
  }
}
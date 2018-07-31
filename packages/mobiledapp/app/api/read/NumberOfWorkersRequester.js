import BoomerangReadRequester from './BoomerangReadRequester';

export default class NumberOfWorkersRequester extends BoomerangReadRequester {

  constructor(businessAddress) {

    const apiMethod = 'getNumberOfWorkers';
    const apiMethodParameters = [businessAddress];

    super(apiMethod, apiMethodParameters);
  }
}
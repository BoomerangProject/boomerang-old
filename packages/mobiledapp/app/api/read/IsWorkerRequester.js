import BoomerangReadRequester from './BoomerangReadRequester';

export default class IsWorkerRequester extends BoomerangReadRequester {

  constructor(address) {

    const apiMethod = 'isWorker';
    const apiMethodParameters = [address];

    super(apiMethod, apiMethodParameters);
  }
}
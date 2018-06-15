import KudosReadRequester from './KudosReadRequester';

export default class IsWorkerRequester extends KudosReadRequester {

  constructor(address) {

    const apiMethod = 'isWorker';
    const apiMethodParameters = [address];

    super(apiMethod, apiMethodParameters);
  }
}
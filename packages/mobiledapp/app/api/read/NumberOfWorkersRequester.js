import KudosReadRequester from "./KudosReadRequester";

export default class NumberOfWorkersRequester extends KudosReadRequester {

  constructor(businessAddress) {

    const apiMethod = 'getNumberOfWorkers';
    const apiMethodParameters = [businessAddress];

    super(apiMethod, apiMethodParameters);
  }
}
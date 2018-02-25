import contract from "truffle-contract";
import KudosContractJson from "../../buildsrc/contractjson/Kudos.json";
import provider from "./Web3Provider";

const KudosContract = contract(KudosContractJson);
KudosContract.setProvider(provider);

class KudosContractService {

  async getInstance() {

    const instance = await KudosContract.at("0xCb6e15D2D929bedDc9F98DE36F9Fa6ac223d0453");
    return instance;
  }

  async isBusiness() {
    const instance = await this.getInstance();
    const isBusiness = await instance.isBusiness("0xdcee2f1da7262362a962d456280a928f4f90bb5e");
    return isBusiness;
  }

  async registerAsBusiness() {
    const instance = await this.getInstance();
    await instance.registerAsBusiness({from: "0xdcee2f1da7262362a962d456280a928f4f90bb5e"});
  }
}

export default new KudosContractService();

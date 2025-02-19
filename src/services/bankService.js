import http from "../axios/bank-http-common";

class BankService {
  allBanks = async () => {
    return await http.get(`/allBanks`);
  };
}
export default new BankService();

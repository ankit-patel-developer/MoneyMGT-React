import http from "../axios/bank-http-common";

class BankService {
  allBanks = async () => {
    console.log("bank service...");
    return await http.get(`/allBanks`);
  };
}
export default new BankService();

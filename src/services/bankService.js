import http from "../axios/bank-http-common";

class BankService {
  allBanks = async () => {
    return await http.get(`/allBanks`);
  };
  createBank = async (data) => {
    return await http.post(`/addBank`, data);
  };

  getBank = async (selectedBankId) => {
    return await http.get(`/getBank/${selectedBankId}`);
  };

  editBank = async (data) => {
    return await http.post(`/editBank`, data);
  };
}
export default new BankService();

import http from "../axios/account-http-common";

class AccountService {
  getBankAccounts = async (bankId) => {
    return await http.get(`/getBankAccounts/${bankId}`);
  };
}
export default new AccountService();

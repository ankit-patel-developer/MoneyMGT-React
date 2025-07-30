import httpTransaction from "../axios/transaction-http-common";

class StatementService {
  // report
  // input = selected bank
  // all-accounts-all-payees
  // all-accounts-all-sources
  getBankStatement = async (data) => {
    return await httpTransaction.post(`/getBankStatement`, data);
  };

  // report
  // input = selected bank's account
  // all-payees
  // all-sources
  getAccountStatement = async (data) => {
    return await httpTransaction.post(`/getAccountStatement`, data);
  };
}
export default new StatementService();

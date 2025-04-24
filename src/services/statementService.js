import httpTransaction from "../axios/transaction-http-common";

class StatementService {
  // report
  // all-accounts-all-payees
  // all-accounts-all-sources
  getBankStatement = async (data) => {
    return await httpTransaction.post(`/getBankStatement`, data);
  };
}
export default new StatementService();

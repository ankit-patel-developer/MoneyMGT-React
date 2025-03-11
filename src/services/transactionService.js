import http from "../axios/source-http-common";
import httpTransaction from "../axios/transaction-http-common";

class TransactionService {
  allSources = async () => {
    return await http.get(`/allSources`);
  };

  depositFromSource = async (data) => {
    return await httpTransaction.post(`/depositFromSource`, data);
  };
}
export default new TransactionService();

import http from "../axios/source-http-common";
import httpTransaction from "../axios/transaction-http-common";
import httpPayee from "../axios/payee-http-common";

class TransactionService {
  allSources = async () => {
    return await http.get(`/allSources`);
  };

  depositFromSource = async (data) => {
    return await httpTransaction.post(`/depositFromSource`, data);
  };

  allPayees = async () => {
    return await httpPayee.get(`/allPayees`);
  };

  withdrawToPayee = async (data) => {
    return await httpTransaction.post(`/withdrawToPayee`, data);
  };
}
export default new TransactionService();

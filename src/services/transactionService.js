import http from "../axios/source-http-common";

class TransactionService {
  allSources = async () => {
    return await http.get(`/allSources`);
  };

  depositTransaction = async (data) => {
    return await http.post(`/depositTransaction`, data);
  };
}
export default new TransactionService();

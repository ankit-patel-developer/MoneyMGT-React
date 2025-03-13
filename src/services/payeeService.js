import http from "../axios/payee-http-common";

class PayeeService {
  allPayeeTypes = async () => {
    return await http.get(`/allPayeeTypes`);
  };
  allPayees = async () => {
    return await http.get(`/allPayees`);
  };
  createPayee = async (data) => {
    return await http.post(`/addPayee`, data);
  };
  getPayee = async (payeeId) => {
    return await http.get(`/getPayee/${payeeId}`);
  };
  editPayee = async (data) => {
    return await http.post(`/editPayee`, data);
  };
}
export default new PayeeService();

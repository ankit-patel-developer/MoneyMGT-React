import http from "../axios/credit-card-http-common";

class CreditCardService {
  allCCs = async () => {
    return await http.get(`/allCCs`);
  };

  allPayeesForCCs = async () => {
    return await http.get(`/allPayeesForCCs`);
  };

  payByCreditCard = async (data) => {
    return await http.post(`/payByCreditCard`, data);
  };
}
export default new CreditCardService();

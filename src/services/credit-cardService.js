import http from "../axios/credit-card-http-common";

class CreditCardService {
  allCCs = async () => {
    return await http.get(`/allCCs`);
  };
}
export default new CreditCardService();

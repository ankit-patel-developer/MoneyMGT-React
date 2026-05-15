import http from "../axios/source-http-common";
import httpVT from "../axios/vt-http-common";

class VTService {
  depositVT = async (data) => {
    return await httpVT.post(`/depositVT`, data);
  };
  withdrawVT = async (data) => {
    return await httpVT.post(`/withdrawVT`, data);
  };
}
export default new VTService();

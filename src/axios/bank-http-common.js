import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:44329/api/Bank",
  headers: {
    "Content-type": "application/json",
  },
});

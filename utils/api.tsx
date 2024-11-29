import axios from "axios";

const api = axios.create({
  baseURL: "http://172.29.220.86:3000/api/", // Mudar esse IP para o IP da sua máquina
});

export default api;

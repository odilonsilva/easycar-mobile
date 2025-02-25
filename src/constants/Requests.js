import axios from "axios";

export const axiosRequest = axios.create({
  baseURL: "http://10.0.0.30:3000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000,
});

export function errorHandling(error) {
  if (error.response) {
    alert(error.response.data.message);
  } else if (error.request) {
    alert("Ocorreu um erro: Servidor não respondeu");
  }
}

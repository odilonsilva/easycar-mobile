import axios from "axios";

export const axiosRequest = axios.create({
  baseURL: "http://10.0.0.30:3000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000,
});

export function errorHandling(error) {
  if (error.response.data.errors) {
    let errorMessage = "";
    error.response.data.errors.forEach((item) => {
      errorMessage += `\n${item.msg}\n`;
    });
    alert(errorMessage);
  } else if (error.response.message) {
    alert(error.response.data.message);
  } else if (error.request) {
    alert("Erro desconhecido");
  } else {
    alert(error.response.data.message);
  }
}

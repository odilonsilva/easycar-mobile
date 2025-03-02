import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ToastAndroid } from "react-native";

const axiosInstance = async () => {
  const token = await getToken();

  return axios.create({
    baseURL: "http://10.0.0.30:3000",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    timeout: 1000,
  });
};

const axiosInstanceLogin = () =>
  axios.create({
    baseURL: "http://10.0.0.30:3000",
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 1000,
  });

function errorHandling(error, navigation) {
  console.log(error, error.status, error.request);
  if (error.status == 401 || error.status == 403) {
    ToastAndroid.show("Não autorizado.", ToastAndroid.LONG);
    navigation.navigate("Login");
    return;
  }

  if (error.response.data.errors) {
    let errorMessage = "";
    error.response.data.errors.forEach(
      (item) => (errorMessage += `\n${item.msg}\n`)
    );
    alert(errorMessage);
  } else if (error.response.message) {
    alert(error.response.data.message);
  } else {
    alert(error.response.data.message);
  }
}

async function getToken() {
  const { token } = JSON.parse(await AsyncStorage.getItem("user"));
  return token;
}

export default {
  axiosInstance,
  axiosInstanceLogin,
  errorHandling,
};

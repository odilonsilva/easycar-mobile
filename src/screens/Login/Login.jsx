import {
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { style } from "./login.style";
import { icons } from "../../constants/images";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import axiosHelper from "../../constants/Requests";
import { LanguageContext } from "../../contexts/LanguageContext";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { saveUser } = useContext(UserContext);
  const { textLocalized } = useContext(LanguageContext);

  async function handleLogin() {
    try {
      if (email.trim() === "" || password.trim() === "") {
        alert("Preencha todos os campos");
        return;
      }
      const axiosInstance = await axiosHelper.axiosInstanceLogin();
      const { data } = await axiosInstance.post("/users/login", {
        email,
        password,
      });

      saveUser(data);
      navigation.navigate("Home");
    } catch (error) {
      axiosHelper.errorHandling(error);
    }
  }

  return (
    <ImageBackground source={icons.bg} style={style.container}>
      <View style={style.logoContainer}>
        <Image source={icons.logo} style={style.logo} />
      </View>
      <View style={style.form}>
        <Text style={style.label}>{textLocalized("login.email")}</Text>
        <TextInput
          style={style.input}
          placeholder={textLocalized("login.emailPlaceholder")}
          onChangeText={(text) => setEmail(text)}
        />

        <Text style={style.label}>{textLocalized("login.password")}</Text>
        <TextInput
          secureTextEntry={true}
          style={style.input}
          placeholder={textLocalized("login.passwordPlaceholder")}
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity style={style.button} onPress={handleLogin}>
          <Text style={style.buttonText}>{textLocalized("login.signIn")}</Text>
        </TouchableOpacity>
        <Text onPress={() => navigation.navigate("Register")}>
          {textLocalized("login.signUp")}
        </Text>
      </View>
    </ImageBackground>
  );
}

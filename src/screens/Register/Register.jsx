import {
  Image,
  ImageBackground,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { style } from "./regtister.style";
import { icons } from "../../constants/images";
import { useNavigation } from "@react-navigation/native";
import { useState, useContext } from "react";
import axiosHelper from "../../constants/Requests";
import { LanguageContext } from "../../contexts/LanguageContext";

export default function Register() {
  const navigation = useNavigation();
  const [focused, setFocused] = useState(1);
  const { textLocalized } = useContext(LanguageContext);
  const [user, setUser] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  async function handleLogin() {
    try {
      for (const item in user) {
        if (user[item].trim() === "" || user[item] == null) {
          alert("Preencha todos os campos");
          return;
        }
      }

      const axiosInstance = await axiosHelper.axiosInstanceLogin();
      await axiosInstance.post("/users", { ...user });

      ToastAndroid.show("Conta criada com sucesso.", ToastAndroid.LONG);
      navigation.navigate("Home");
    } catch (error) {
      axiosHelper.errorHandling(error);
    }
  }

  return (
    <ImageBackground source={icons.bg} style={style.container}>
      <View style={[style.logoContainer, , { flex: focused }]}>
        <Image source={icons.logo} style={style.logo} />
      </View>
      <View style={style.form}>
        <Text style={style.title}>
          {textLocalized("register.createAccount")}
        </Text>

        <Text style={style.label}>{textLocalized("register.name")}</Text>
        <TextInput
          style={style.input}
          placeholder={textLocalized("register.namePlaceholder")}
          onChangeText={(text) => setUser({ ...user, name: text })}
          onFocus={() => setFocused(0)}
        />
        <Text style={style.label}>{textLocalized("register.phone")}</Text>
        <TextInput
          style={style.input}
          inputMode="tel"
          placeholder={textLocalized("register.phonePlaceholder")}
          onChangeText={(text) => setUser({ ...user, phone: text })}
          onFocus={() => setFocused(0)}
        />
        <Text style={style.label}>{textLocalized("register.email")}</Text>
        <TextInput
          style={style.input}
          placeholder={textLocalized("register.emailPlaceholder")}
          onChangeText={(text) => setUser({ ...user, email: text })}
          onFocus={() => setFocused(0)}
        />
        <Text style={style.label}>{textLocalized("register.password")}</Text>
        <TextInput
          secureTextEntry={true}
          style={style.input}
          placeholder={textLocalized("register.passwordPlaceholder")}
          onChangeText={(text) => setUser({ ...user, password: text })}
          onFocus={() => setFocused(0)}
        />
        <TouchableOpacity style={style.button} onPress={handleLogin}>
          <Text style={style.buttonText}>{textLocalized("register.send")}</Text>
        </TouchableOpacity>
        <Text onPress={() => navigation.navigate("Login")}>
          {textLocalized("register.back")}
        </Text>
      </View>
    </ImageBackground>
  );
}

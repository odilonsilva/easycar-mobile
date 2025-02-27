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
import { useState } from "react";
import { axiosRequest, errorHandling } from "../../constants/Requests";

export default function Register() {
  const navigation = useNavigation();
  const [focused, setFocused] = useState(1);
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

      await axiosRequest.post("/users", { ...user });

      ToastAndroid.show("Conta criada com sucesso.", ToastAndroid.LONG);
      navigation.navigate("Home");
    } catch (error) {
      errorHandling(error);
    }
  }

  return (
    <ImageBackground source={icons.bg} style={style.container}>
      <View style={[style.logoContainer, , { flex: focused }]}>
        <Image source={icons.logo} style={style.logo} />
      </View>
      <View style={style.form}>
        <Text style={style.title}>Crie sua conta</Text>

        <Text style={style.label}>Nome</Text>
        <TextInput
          style={style.input}
          placeholder="Digite seu Nome"
          onChangeText={(text) => setUser({ ...user, name: text })}
          onFocus={() => setFocused(0)}
        />
        <Text style={style.label}>Telefone</Text>
        <TextInput
          style={style.input}
          inputMode="tel"
          placeholder="Digite seu Telefone"
          onChangeText={(text) => setUser({ ...user, phone: text })}
          onFocus={() => setFocused(0)}
        />
        <Text style={style.label}>E-mail</Text>
        <TextInput
          style={style.input}
          placeholder="Digite seu e-mail"
          onChangeText={(text) => setUser({ ...user, email: text })}
          onFocus={() => setFocused(0)}
        />
        <Text style={style.label}>Senha</Text>
        <TextInput
          secureTextEntry={true}
          style={style.input}
          placeholder="Digite sua senha"
          onChangeText={(text) => setUser({ ...user, password: text })}
          onFocus={() => setFocused(0)}
        />
        <TouchableOpacity style={style.button} onPress={handleLogin}>
          <Text style={style.buttonText}>Enviar</Text>
        </TouchableOpacity>
        <Text onPress={() => navigation.navigate("Login")}>Voltar</Text>
      </View>
    </ImageBackground>
  );
}

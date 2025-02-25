import {
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { style } from "./regtister.style";
import { icons } from "../../constants/images";
import { Link, useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function Register() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { saveUser } = useContext(UserContext);

  function handleLogin() {
    if (email.trim() === "" || password.trim() === "") {
      alert("Preencha todos os campos");
      return;
    }
    saveUser({ email, password });
    navigation.navigate("Home");
  }

  return (
    <ImageBackground source={icons.bg} style={style.container}>
      <View style={style.logoContainer}>
        <Image source={icons.logo} style={style.logo} />
      </View>
      <View style={style.form}>
        <Text style={style.label}>E-mail</Text>
        <TextInput
          style={style.input}
          placeholder="Digite seu e-mail"
          onChangeText={(text) => setEmail(text)}
        />

        <Text style={style.label}>Senha</Text>
        <TextInput
          secureTextEntry={true}
          style={style.input}
          placeholder="Digite sua senha"
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity style={style.button} onPress={handleLogin}>
          <Text style={style.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <Link to="/Register">Cadastrar</Link>
      </View>
    </ImageBackground>
  );
}

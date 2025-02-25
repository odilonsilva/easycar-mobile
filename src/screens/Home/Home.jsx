import {
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { icons } from "../../constants/images";
import { style } from "./home.style";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { UserCircle2Icon } from "lucide-react-native";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";

export default function Home() {
  const navigation = useNavigation();
  const { user, removeUser } = useContext(UserContext);

  async function logout() {
    Alert.alert("Sair", "Deslogar do aplicativo?", [
      {
        text: "Cancelar",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Sair",
        onPress: async () => {
          removeUser();

          navigation.navigate("Login");
        },
      },
    ]);
  }

  return (
    <ImageBackground source={icons.bg} style={style.container}>
      <StatusBar barStyle="default" />

      <View style={style.userContainer}>
        <TouchableOpacity onPress={logout} style={style.buttonUser}>
          <UserCircle2Icon size={14} color="#fff" />
          <Text style={style.userTitle}>{user?.name}</Text>
        </TouchableOpacity>
      </View>

      <View style={style.container}>
        <Image source={icons.logo} style={style.logo} />

        <TouchableOpacity
          style={style.buttons}
          onPress={() => navigation.navigate("Passenger")}
        >
          <Image source={icons.passenger} style={style.buttonImage} />
          <Text style={style.title}>Passageiro</Text>
          <Text style={style.text}>Encontre uma carona para você</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={style.buttons}
          onPress={() => navigation.navigate("Driver")}
        >
          <Image source={icons.driver} style={style.buttonImage} />
          <Text style={style.title}>Motorista</Text>
          <Text style={style.text}>Ofereça uma carona em seu carro</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

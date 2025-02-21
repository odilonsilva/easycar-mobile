import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import { icons } from "../../constants/images";
import { style } from "./home.style";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();

  function openPassenger() {
    navigation.navigate("Passenger");
  }

  function openDriver() {
    navigation.navigate("Driver");
  }

  return (
    <ImageBackground source={icons.bg} style={style.container}>
      <Image source={icons.logo} style={style.logo} />

      <TouchableOpacity style={style.buttons} onPress={() => openPassenger()}>
        <Image source={icons.passenger} style={style.buttonImage} />
        <Text style={style.title}>Passageiro</Text>
        <Text style={style.text}>Encontre uma carona para você</Text>
      </TouchableOpacity>

      <TouchableOpacity style={style.buttons} onPress={() => openDriver()}>
        <Image source={icons.driver} style={style.buttonImage} />
        <Text style={style.title}>Motorista</Text>
        <Text style={style.text}>Ofereça uma carona em seu carro</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

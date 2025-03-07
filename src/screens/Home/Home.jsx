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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { UserCircle2Icon } from "lucide-react-native";
import { UserContext } from "../../contexts/UserContext";
import { useCallback, useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";

export default function Home() {
  const navigation = useNavigation();
  const { user, removeUser } = useContext(UserContext);
  const { textLocalized } = useContext(LanguageContext);

  async function logout() {
    Alert.alert(textLocalized("home.exit"), textLocalized("home.exitMessage"), [
      {
        text: textLocalized("home.cancel"),
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: textLocalized("home.logOut"),
        onPress: async () => {
          removeUser();

          navigation.navigate("Login");
        },
      },
    ]);
  }

  useFocusEffect(
    useCallback(() => {
      if (!user) navigation.navigate("Login");
    }, [])
  );

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
          <Text style={style.title}>{textLocalized("home.passenger")}</Text>
          <Text style={style.text}>{textLocalized("home.passengerHint")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={style.buttons}
          onPress={() => navigation.navigate("Driver")}
        >
          <Image source={icons.driver} style={style.buttonImage} />
          <Text style={style.title}>{textLocalized("home.driver")}</Text>
          <Text style={style.text}>{textLocalized("home.driverHint")}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

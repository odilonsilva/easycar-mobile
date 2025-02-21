import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { json_rides } from "../../constants/dados";
import { icons } from "../../constants/images";
import { style } from "./driver.style";
import { useNavigation } from "@react-navigation/native";

export default function Driver() {
  const navigation = useNavigation();

  return (
    <FlatList
      data={json_rides}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={style.container}
          onPress={() =>
            navigation.navigate("Details", { rideId: item.ride_id })
          }
        >
          <View style={style.titleContainer}>
            {item.status == "A" && (
              <Image source={icons.car} style={style.icon} />
            )}
            <Text style={style.title}>{item.passenger_name}</Text>
          </View>
          <Text style={style.subtitle}>Origem: {item.pickup_address}</Text>
          <Text style={style.subtitle}>Destino: {item.dropoff_address}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

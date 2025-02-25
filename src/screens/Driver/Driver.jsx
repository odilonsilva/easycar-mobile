import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { icons } from "../../constants/images";
import { style } from "./driver.style";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { axiosRequest, errorHandling } from "../../constants/Requests";
import { useCallback, useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function Driver() {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const [rides, setRides] = useState([]);

  async function getRides() {
    try {
      const { data } = await axiosRequest.get(`/rides/drivers/${user.user_id}`);
      setRides(data);
      console.log(rides.length);
    } catch (error) {
      errorHandling(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getRides();
    }, [])
  );

  if (rides.length == 0)
    return (
      <View style={style.container}>
        <Text>Não existem solicitações de caronas.</Text>
      </View>
    );

  return (
    <FlatList
      data={rides}
      keyExtractor={(item) => item.ride_id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={style.container}
          key={item.ride_id}
          onPress={() =>
            navigation.navigate("Details", {
              rideId: item.ride_id,
              driverId: user.user_id,
            })
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

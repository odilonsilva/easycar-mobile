import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { icons } from "../../constants/images";
import { style } from "./driver.style";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { LandPlotIcon } from "lucide-react-native";
import axiosHelper from "../../constants/Requests";
import { LanguageContext } from "../../contexts/LanguageContext";

export default function Driver() {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const { textLocalized } = useContext(LanguageContext);
  const [rides, setRides] = useState([]);

  async function getRides() {
    try {
      const axiosInstance = await axiosHelper.axiosInstance();
      const { data } = await axiosInstance.get(
        `/rides/drivers/${user.user_id}`
      );
      setRides(data);
    } catch (error) {
      axiosHelper.errorHandling(error, navigation);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getRides();
    }, [])
  );

  if (rides.length == 0)
    return (
      <View style={style.containerEmpty}>
        <LandPlotIcon
          width={style.emptyIcon.width}
          height={style.emptyIcon.height}
          style={style.emptyIcon}
        />
        <Text style={style.emptyTitle}>
          {textLocalized("driver.emptyMessage")}
        </Text>
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
          <Text style={style.subtitle}>
            {" "}
            {textLocalized("driver.origin")}: {item.pickup_address}
          </Text>
          <Text style={style.subtitle}>
            {" "}
            {textLocalized("driver.destination")}: {item.dropoff_address}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}

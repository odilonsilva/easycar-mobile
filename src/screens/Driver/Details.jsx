import { Alert, Text, TextInput, ToastAndroid, View } from "react-native";
import { style } from "./details.style";
import MyButton from "../../components/MyButton";
import { useEffect, useState, useContext } from "react";
import MapView, { Marker } from "react-native-maps";
import Loader from "../../components/Loader";
import { useNavigation } from "@react-navigation/native";
import axiosHelper from "../../constants/Requests";
import { LanguageContext } from "../../contexts/LanguageContext";

export default function Details({ route }) {
  const driverId = route.params.driverId;
  const rideId = route.params.rideId;
  const [ride, setRide] = useState({ status: "" });
  const [passengerInfo, setPassengerInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropOffLocation, setDropOffLocation] = useState(null);
  const [myLocation, setMyLocation] = useState(null);
  const navigation = useNavigation();
  const { textLocalized } = useContext(LanguageContext);

  async function AcceptAction() {
    try {
      const axiosInstance = await axiosHelper.axiosInstance();
      await axiosInstance.put(`/rides/${rideId}/accept`, {
        driver_id: driverId,
      });

      ToastAndroid.show(
        textLocalized("details.acceptMessage"),
        ToastAndroid.LONG
      );
      navigation.goBack();
    } catch (error) {
      axiosHelper.errorHandling(error, navigation);
    }
  }

  function CancelAction() {
    Alert.alert(
      textLocalized("details.cancelMessageTitle"),
      textLocalized("details.cancelMessage"),
      [
        {
          text: textLocalized("details.cancel"),
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: textLocalized("details.send"),
          onPress: async () => {
            try {
              ToastAndroid.show(
                textLocalized("details.cancelMessageSuccess"),
                ToastAndroid.LONG
              );
              const axiosInstance = await axiosHelper.axiosInstance();
              await axiosInstance.put(`/rides/${rideId}/cancel`);

              navigation.goBack();
            } catch (error) {
              axiosHelper.errorHandling(error, navigation);
            }
          },
        },
      ]
    );
  }

  async function RequestRide() {
    try {
      const axiosInstance = await axiosHelper.axiosInstance();
      const { data: ride } = await axiosInstance.get(`/rides/${rideId}`);

      if (ride) {
        if (ride.status === "F") navigation.goBack();

        setMyLocation({
          title: ride.pickup_address,
          description: ride.passenger_name,
          latitude: Number(ride.pickup_latitude),
          longitude: Number(ride.pickup_longitude),
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        });

        setRide(ride);
        setPickupLocation(ride.pickup_address);
        setDropOffLocation(ride.dropoff_address);
        setPassengerInfo(
          `${ride.passenger_name} - ${textLocalized("details.phone")} ${
            ride.passenger_phone
          }`
        );
      }

      setLoading(false);
    } catch (error) {
      axiosHelper.errorHandling(error, navigation);
    }
  }

  useEffect(() => {
    RequestRide();
  }, []);

  if (loading) return <Loader />;

  return (
    <View style={style.container}>
      <MapView
        style={style.map}
        provider="google"
        initialRegion={{
          latitude: myLocation.latitude,
          longitude: myLocation.longitude,
          latitudeDelta: myLocation.latitudeDelta,
          longitudeDelta: myLocation.longitudeDelta,
        }}
      >
        <Marker
          coordinate={{
            latitude: myLocation.latitude,
            longitude: myLocation.longitude,
          }}
          title={myLocation.title}
          description={myLocation.description}
          style={style.marker}
          sh
          // icon={icons.location}
        />
      </MapView>

      <View style={style.formContainer}>
        <Text style={style.title}>{passengerInfo}</Text>
        <View>
          <Text>{textLocalized("details.origin")}</Text>
          <TextInput
            style={[
              style.textInput,
              ride.status !== "" ? style.textDisabled : "",
            ]}
            editable={ride.status == "" ? true : false}
            value={pickupLocation}
          />
        </View>
        <View>
          <Text>{textLocalized("details.destination")}</Text>
          <TextInput
            style={[
              style.textInput,
              ride.status !== "" ? style.textDisabled : "",
            ]}
            editable={ride.status == "" ? true : false}
            value={dropOffLocation}
          />
        </View>
      </View>
      {ride.status == "P" && (
        <MyButton
          text={textLocalized("details.accept")}
          action={AcceptAction}
          color="default"
        />
      )}

      {ride.status == "A" && (
        <MyButton
          text={textLocalized("details.cancel")}
          action={CancelAction}
          color="red"
        />
      )}
    </View>
  );
}

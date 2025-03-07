import { Alert, Text, TextInput, ToastAndroid, View } from "react-native";
import { style } from "./passenger.style";
import MyButton from "../../components/MyButton";
import { useContext, useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import Loader from "../../components/Loader";
import {
  getCurrentPositionAsync,
  getLastKnownPositionAsync,
  requestForegroundPermissionsAsync,
  reverseGeocodeAsync,
} from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../contexts/UserContext";
import axiosHelper from "../../constants/Requests";
import { LanguageContext } from "../../contexts/LanguageContext";

export default function Passenger() {
  const [ride, setRide] = useState({ status: "" });
  const [myLocation, setMyLocation] = useState({});
  const [loading, setLoading] = useState(true);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropOffLocation, setDropOffLocation] = useState(null);
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const { textLocalized } = useContext(LanguageContext);

  async function ConfirmAction() {
    try {
      if (dropOffLocation == null || pickupLocation == null) {
        Alert.alert(
          textLocalized("passenger.confirmMessageTitle"),
          textLocalized("passenger.confirmMessage")
        );
        return;
      }

      ToastAndroid.show(
        textLocalized("passenger.confirmMessageSuccess"),
        ToastAndroid.LONG
      );

      const axiosInstance = await axiosHelper.axiosInstance();
      await axiosInstance.post("/rides", {
        passenger_user_id: user.user_id,
        pickup_latitude: myLocation.latitude,
        pickup_longitude: myLocation.longitude,
        pickup_address: pickupLocation,
        dropoff_address: dropOffLocation,
      });

      navigation.goBack();
    } catch (error) {
      axiosHelper.errorHandling(error, navigation);
    }
  }

  function CancelAction() {
    Alert.alert(
      textLocalized("passenger.cancelMessageTitle"),
      textLocalized("passenger.cancelMessage"),
      [
        {
          text: textLocalized("passenger.cancel"),
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: textLocalized("passenger.send"),
          onPress: async () => {
            ToastAndroid.show(
              textLocalized("passenger.cancelMessageSuccess"),
              ToastAndroid.LONG
            );

            try {
              const axiosInstance = await axiosHelper.axiosInstance();
              await axiosInstance.delete(`/rides/${ride.ride_id}`);
              navigation.goBack();
            } catch (error) {
              axiosHelper.errorHandling(error, navigation);
            }
          },
        },
      ]
    );
  }

  function FinishAction() {
    Alert.alert(
      textLocalized("passenger.finishMessageTitle"),
      textLocalized("passenger.finishMessage"),
      [
        {
          text: textLocalized("passenger.cancel"),
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: textLocalized("passenger.send"),
          onPress: async () => {
            ToastAndroid.show(
              textLocalized("passenger.finishMessageSuccess"),
              ToastAndroid.LONG
            );

            try {
              const axiosInstance = await axiosHelper.axiosInstance();
              await axiosInstance.put(`/rides/${ride.ride_id}/finish`);
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
      const pickup_date = new Date().toISOString().split("T")[0];
      const axiosInstance = await axiosHelper.axiosInstance();
      const { data } = await axiosInstance.get("/rides", {
        params: {
          passenger_user_id: user.user_id,
          pickup_date,
          status_not: "F",
        },
      });
      return data[0] || null;
    } catch (error) {
      axiosHelper.errorHandling(error, navigation);
    }
  }

  async function RequestUserLocation() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      let location = await getLastKnownPositionAsync();
      console.log("location", location);

      if (!location) location = await getCurrentPositionAsync();

      if (!location) return null;

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      };
    }
    return null;
  }

  async function RequestUserAddress(latitude, longitude) {
    const data = await reverseGeocodeAsync({ latitude, longitude });

    return `${data[0].street}, ${data[0].streetNumber} - ${data[0].district}, ${data[0].subregion}`;
  }

  async function LoadScreen() {
    const rideResponse = await RequestRide();

    if (rideResponse) {
      setMyLocation({
        title: rideResponse.pickup_address,
        description: rideResponse.passenger_name,
        latitude: Number(rideResponse.pickup_latitude),
        longitude: Number(rideResponse.pickup_longitude),
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      });

      setRide(rideResponse);
      setPickupLocation(rideResponse.pickup_address);
      setDropOffLocation(rideResponse.dropoff_address);
      setLoading(false);
      return;
    }

    const location = await RequestUserLocation();

    if (location) {
      setMyLocation(location);
      const pickupAddress = await RequestUserAddress(
        location.latitude,
        location.longitude
      );
      setPickupLocation(pickupAddress);
      setRide({
        status: "",
        latitude: location.latitude,
        longitude: location.longitude,
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    LoadScreen();
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
        />
      </MapView>

      <View style={style.formContainer}>
        <Text style={style.title}>
          {ride.status == "" && textLocalized("passenger.findRide")}
          {ride.status == "P" && textLocalized("passenger.waitingRide")}
          {ride.status == "A" && textLocalized("passenger.confirmedRide")}
        </Text>
        <View>
          <Text>{textLocalized("passenger.origin")}</Text>
          <TextInput
            style={[
              style.textInput,
              ride.status !== "" ? style.textDisabled : "",
            ]}
            editable={ride.status == "" ? true : false}
            value={pickupLocation}
            onChangeText={(value) => setPickupLocation(value)}
          />
        </View>
        <View>
          <Text>{textLocalized("passenger.destination")}</Text>
          <TextInput
            style={[
              style.textInput,
              ride.status !== "" ? style.textDisabled : "",
            ]}
            editable={ride.status == "" ? true : false}
            value={dropOffLocation}
            onChangeText={(value) => setDropOffLocation(value)}
          />
        </View>
        {ride && ride.status == "A" && (
          <View>
            <Text>{textLocalized("passenger.driver")}</Text>
            <TextInput
              style={[style.textInput, style.textDisabled]}
              editable={false}
              value={ride.driver_name}
            />
          </View>
        )}
      </View>
      {ride.status == "" && (
        <MyButton
          text={textLocalized("passenger.confirm")}
          action={ConfirmAction}
          color="default"
        />
      )}
      {ride.status == "A" && (
        <MyButton
          text={textLocalized("passenger.finish")}
          action={FinishAction}
          color="red"
        />
      )}
      {ride.status == "P" && (
        <MyButton
          text={textLocalized("passenger.cancel")}
          action={CancelAction}
          color="red"
        />
      )}
    </View>
  );
}

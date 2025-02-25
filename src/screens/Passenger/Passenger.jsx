import { Alert, Text, TextInput, ToastAndroid, View } from "react-native";
import { style } from "./passenger.style";
import MyButton from "../../components/MyButton";
import { useContext, useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import Loader from "../../components/Loader";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
  reverseGeocodeAsync,
} from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../contexts/UserContext";
import { axiosRequest, errorHandling } from "../../constants/Requests";

export default function Passenger() {
  const [ride, setRide] = useState({ status: "" });
  const [myLocation, setMyLocation] = useState({});
  const [loading, setLoading] = useState(true);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropOffLocation, setDropOffLocation] = useState(null);
  const navigation = useNavigation();
  const { user } = useContext(UserContext);

  async function ConfirmAction() {
    try {
      if (dropOffLocation == null || pickupLocation == null) {
        Alert.alert("Atenção", "Informe o endereço de origem e destino");
        return;
      }

      ToastAndroid.show(
        "Sua solicição de carona foi enviada! Aguarde um motorista",
        ToastAndroid.LONG
      );
      await axiosRequest.post(`/rides`, {
        passenger_user_id: user.user_id,
        pickup_latitude: myLocation.latitude,
        pickup_longitude: myLocation.longitude,
        pickup_address: pickupLocation,
        dropoff_address: dropOffLocation,
      });

      navigation.goBack();
    } catch (error) {
      errorHandling(error);
    }
  }

  function CancelAction() {
    Alert.alert(
      "Cancelar Carona",
      "Caso você precise de uma nova corrida , basta voltar para fila de caronas.",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Enviar",
          onPress: async () => {
            ToastAndroid.show(
              "Carona cancelada com sucesso!",
              ToastAndroid.LONG
            );

            await axiosRequest.delete(`/rides/${ride.ride_id}`);

            navigation.goBack();
          },
        },
      ]
    );
  }

  function FinishAction() {
    Alert.alert("Finalizar Carona", "Finalizar essa corrida", [
      {
        text: "Cancelar",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Enviar",
        onPress: async () => {
          ToastAndroid.show(
            "Carona finalizada com sucesso!",
            ToastAndroid.LONG
          );

          await axiosRequest.put(`/rides/${ride.ride_id}/finish`);
          navigation.goBack();
        },
      },
    ]);
  }

  async function RequestRide() {
    try {
      const pickup_date = new Date().toISOString().split("T")[0];
      const { data } = await axiosRequest.get("/rides", {
        params: {
          passenger_user_id: user.user_id,
          pickup_date,
          status_not: "F",
        },
      });
      return data[0] || null;
    } catch (error) {
      errorHandling(error);
    }
  }

  async function RequestUserLocation() {
    const granted = await requestForegroundPermissionsAsync();
    if (granted) {
      const location = await getCurrentPositionAsync();

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
          {ride.status == "" && "Encontre sua carona"}
          {ride.status == "P" && "Aguardando uma carona..."}
          {ride.status == "A" && "Carona confirmada"}
        </Text>
        <View>
          <Text>Origem:</Text>
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
          <Text>Destino:</Text>
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
            <Text>Motorista:</Text>
            <TextInput
              style={[style.textInput, style.textDisabled]}
              editable={false}
              value={ride.driver_name}
            />
          </View>
        )}
      </View>
      {ride.status == "" && (
        <MyButton text="Confirmar" action={ConfirmAction} color="default" />
      )}
      {ride.status == "A" && (
        <MyButton text="finalizar" action={FinishAction} color="red" />
      )}
      {ride.status == "P" && (
        <MyButton text="Cancelar" action={CancelAction} color="red" />
      )}
    </View>
  );
}

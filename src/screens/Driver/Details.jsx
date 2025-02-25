import { Alert, Text, TextInput, ToastAndroid, View } from "react-native";
import { style } from "./details.style";
import MyButton from "../../components/MyButton";
import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import Loader from "../../components/Loader";
import { useNavigation } from "@react-navigation/native";
import { axiosRequest, errorHandling } from "../../constants/Requests";

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

  async function AcceptAction() {
    try {
      await axiosRequest.put(`/rides/${rideId}/accept`, {
        driver_id: driverId,
      });

      ToastAndroid.show("Corrida aceita", ToastAndroid.LONG);
      navigation.goBack();
    } catch (error) {
      errorHandling(error);
    }
  }

  function CancelAction() {
    Alert.alert(
      "Cancelar Carona",
      "Cancelando essa corrida, o Passageiro voltará para fila de viagens disponiveis.",
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

            await axiosRequest.put(`/rides/${rideId}/cancel`);

            navigation.goBack();
          },
        },
      ]
    );
  }

  async function RequestRide() {
    const { data: ride } = await axiosRequest.get(`/rides/${rideId}`);

    if (ride) {
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
      setPassengerInfo(`${ride.passenger_name} - Tel: ${ride.passenger_phone}`);
    }

    setLoading(false);
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
          <Text>Origem:</Text>
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
          <Text>Destino:</Text>
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
        <MyButton text="aceitar" action={AcceptAction} color="default" />
      )}

      {ride.status == "A" && (
        <MyButton text="cancelar" action={CancelAction} color="red" />
      )}
    </View>
  );
}

import { Text, TextInput, ToastAndroid, View } from "react-native";
import { style } from "./details.style";
import MyButton from "../../components/MyButton";
import { json_rides } from "../../constants/dados";
import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";

import Loader from "../../components/Loader";
import { icons } from "../../constants/images";

export default function Details({ route }) {
  const driverID = 5;
  const { rideId } = route.params;
  const [ride, setRide] = useState({ status: "" });
  const [loading, setLoading] = useState(true);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropOffLocation, setDropOffLocation] = useState(null);
  const [myLocation, setMyLocation] = useState({
    title: "",
    description: "",
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  function AcceptAction() {
    ToastAndroid.show("AcceptAction", ToastAndroid.LONG);
  }

  function CancelAction() {
    ToastAndroid.show("CancelAction", ToastAndroid.LONG);
  }

  function FinishAction() {
    ToastAndroid.show("FinishAction", ToastAndroid.LONG);
  }

  async function RequestRide() {
    const rideResponse = json_rides;

    if (rideResponse) {
      const ride = rideResponse.find((item) => item.ride_id === rideId);
      setMyLocation({
        title: ride.pickup_address,
        description: ride.passenger_name,
        latitude: Number(ride.latitude),
        longitude: Number(ride.longitude),
        latitudeDelta: 0.004,
        longitudeDelta: 0.004,
      });
      console.log(myLocation);
      setRide(ride);
      setPickupLocation(ride.pickup_address);
      setDropOffLocation(ride.dropoff_address);
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
          icon={icons.location}
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

        <View>
          <Text>Passageiro:</Text>
          <TextInput
            style={[style.textInput, style.textDisabled]}
            editable={false}
            value={ride.passenger_name}
          />
        </View>
        <View>
          <Text>Telefone:</Text>
          <TextInput
            style={[style.textInput, style.textDisabled]}
            editable={false}
            value={ride.passenger_phone}
          />
        </View>
      </View>
      {ride.status == "P" && (
        <MyButton text="aceitar" action={AcceptAction} color="default" />
      )}
      {ride.status == "C" && (
        <MyButton text="finalizar" action={FinishAction} color="red" />
      )}
      {ride.status == "A" && (
        <MyButton text="Cancelar" action={CancelAction} color="red" />
      )}
    </View>
  );
}

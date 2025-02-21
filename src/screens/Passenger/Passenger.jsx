import { Text, TextInput, ToastAndroid, View } from "react-native";
import { style } from "./passenger.style";
import MyButton from "../../components/MyButton";
import { json_ride } from "../../constants/dados";
import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { icons } from "../../constants/images";

import Loader from "../../components/Loader";

export default function Passenger() {
  const [ride, setRide] = useState({ status: "" });
  const [myLocation, setMyLocation] = useState({
    title: "",
    description: "",
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });
  const [loading, setLoading] = useState(true);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropOffLocation, setDropOffLocation] = useState(null);

  function ConfirmAction() {
    ToastAndroid.show("ConfirmAction", ToastAndroid.LONG);
  }

  function CancelAction() {
    ToastAndroid.show("CancelAction", ToastAndroid.LONG);
  }

  function FinishAction() {
    ToastAndroid.show("FinishAction", ToastAndroid.LONG);
  }

  async function RequestRide() {
    const rideResponse = json_ride;

    if (rideResponse) {
      setMyLocation({
        title: rideResponse.pickup_address,
        description: rideResponse.passenger_name,
        latitude: Number(rideResponse.latitude),
        longitude: Number(rideResponse.longitude),
        latitudeDelta: 0.004,
        longitudeDelta: 0.004,
      });

      setRide(rideResponse);
      setPickupLocation(rideResponse.pickup_address);
      setDropOffLocation(rideResponse.dropoff_address);
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

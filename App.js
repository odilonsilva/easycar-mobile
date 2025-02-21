import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Passenger from "./src/screens/Passenger/Passenger";
import Home from "./src/screens/Home/Home";
import Driver from "./src/screens/Driver/Driver";
import Details from "./src/screens/Driver/Details";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Passenger"
          component={Passenger}
          options={{
            title: "",
            headerTransparent: true,
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="Driver"
          component={Driver}
          options={{ title: "Viagens disponiveis", headerStyle: "center" }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            title: "",
            headerTransparent: true,
            headerShadowVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

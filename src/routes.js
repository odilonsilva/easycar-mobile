import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home/Home";
import Passenger from "./screens/Passenger/Passenger";
import Driver from "./screens/Driver/Driver";
import Details from "./screens/Driver/Details";
import Login from "./screens/Login/Login";
import { UserProvider } from "./contexts/UserContext";
import Register from "./screens/Register/Register";
import { LanguageProvider } from "./contexts/LanguageContext";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <LanguageProvider>
        <UserProvider>
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
              options={{
                title: "Viagens disponiveis",
                headerTitleAlign: "center",
              }}
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
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </UserProvider>
      </LanguageProvider>
    </NavigationContainer>
  );
}

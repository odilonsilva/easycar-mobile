import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  async function loadUser() {
    const user = await AsyncStorage.getItem("user");

    if (user) {
      setUser(JSON.parse(user));
      return;
    }

    navigation.navigate("Login");
  }

  async function saveUser(user) {
    await AsyncStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }

  async function removeUser() {
    await AsyncStorage.removeItem("user");
    setUser(null);
  }

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    loadUser();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, saveUser, removeUser, loadUser }}>
      {children}
    </UserContext.Provider>
  );
}

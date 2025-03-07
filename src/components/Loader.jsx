import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { LanguageContext } from "../contexts/LanguageContext";
import { useContext } from "react";

export default function Loader() {
  const { textLocalized } = useContext(LanguageContext);
  return (
    <View style={[style.container, style.loading]}>
      <ActivityIndicator size="large" color="#333" style={style.loader} />
      <Text>{textLocalized("home.loading")}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    color: "#333",
    width: 60,
    height: 60,
  },
});

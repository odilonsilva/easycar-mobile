import { Loader2 } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

export default function Loader() {
  return (
    <View style={[style.container, style.loading]}>
      <Loader2 width={60} height={60} style={style.loader} />
      <Text>Carregando...</Text>
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
  },
});

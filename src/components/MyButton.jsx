import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function MyButton({ text, action, color }) {
  return (
    <TouchableOpacity
      style={[
        style.button,
        color == "default" ? style.themeDefault : style.themeRed,
      ]}
      onPress={() => action()}
    >
      <Text style={[style.textDefault, color == "red" ? style.textRed : ""]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  button: {
    padding: 18,
  },
  themeDefault: {
    backgroundColor: "#ff0",
  },
  themeRed: {
    backgroundColor: "#f66",
  },
  textDefault: {
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  textRed: {
    color: "#fff",
  },
});

import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: 10,
    gap: 10,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: "semibold",
    textAlign: "center",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "silver",
    borderRadius: 5,
  },
  textDisabled: {
    backgroundColor: "#f0f0f0",
    color: "#444",
  },
  map: {
    flex: 1,
    width: "100%",
  },
  marker: {
    width: 180,
    height: 180,
  },
});

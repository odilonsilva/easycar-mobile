import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
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
  formContainer: {
    backgroundColor: "#fff",
    padding: 10,
    gap: 10,
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

import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 48,
  },
  form: {
    flex: 2,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    gap: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "silver",
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#efe400",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

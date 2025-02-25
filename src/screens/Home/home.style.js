import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  logo: {
    width: 200,
    height: 46,
    marginBottom: 30,
  },
  buttons: {
    margin: 20,
    textAlign: "center",
    alignItems: "center",
  },
  buttonImage: {
    width: 160,
    height: 160,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  userContainer: {
    width: "100%",
    // backgroundColor: "#000",
    padding: 10,
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "flex-end",
  },
  buttonUser: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  userTitle: {
    marginLeft: 5,
    fontSize: 12,
    color: "#fff",
    fontWeight: "semibold",
  },
  text: {
    color: "#fff",
  },
});

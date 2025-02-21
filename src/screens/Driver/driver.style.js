import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "silver",
    gap: 3,
  },
  icon: {
    width: 18,
    height: 18,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#666",
  },
});

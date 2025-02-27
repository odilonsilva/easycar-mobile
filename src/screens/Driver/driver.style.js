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
  containerEmpty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  emptyIcon: {
    width: 64,
    height: 64,
    color: "#666",
    margin: 10,
  },
  emptyTitle: {
    fontSize: 18,
    color: "#666",
    fontWeight: "bold",
  },
});

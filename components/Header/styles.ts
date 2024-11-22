import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    paddingTop: 40,
    backgroundColor: "#151819",
    borderBottomWidth: 1,
    borderBottomColor: "#ed145b",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ed145b",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    fontSize: 16,
    color: "#ed145b",
    marginLeft: 4,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#ed145b",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;

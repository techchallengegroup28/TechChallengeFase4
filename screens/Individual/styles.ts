import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151819",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  titulo: {
    color: "#ed145b",

    fontWeight: "bold",
    marginTop: 20,
    fontSize: 30,
  },
  descricao: {
    marginTop: 10,
    color: "#fff",
  },
  conteudo: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
  },
  image: {
    width: "90%",
    height: 300,
    borderRadius: 10,
  },
  item: {
    // backgroundColor: "#ed145b",
    width: "100%",
    // borderWidth: 1,
    // borderColor: "#282828",
    marginTop: 20,
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  dt: {
    color: "#fff",
    fontSize: 10,
  },
  dts: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    marginTop: 20,
    gap: 10,
    flexDirection: "row",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});

export default styles;

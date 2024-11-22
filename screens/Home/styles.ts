import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151819",
  },
  content: {
    flex: 1,
    padding: 16,
    // justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ed145b",
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginHorizontal: 20,
  },
  novoText: {
    backgroundColor: "#ed145b",
    color: "#fff",
    fontWeight: "bold",
    padding: 10,
    width: "30%",
    textAlign: "center",
    borderRadius: 10,
  },
  pesquisar: {
    // borderWidth: 1,
    // borderColor: "#ed145b",
    width: "90%",
    backgroundColor: "#282828",
    display: "flex",
    flexDirection: "row",
    padding: 5,
    margin: 10,
    borderRadius: 10,
  },
  pesquisarInput: {
    color: "#ed145b",
    width: "90%",
  },
  novo: {
    width: "90%",
    display: "flex",
    alignItems: "flex-end",
  },
  item: {
    // backgroundColor: "#ed145b",
    width: "100%",
    borderWidth: 1,
    borderColor: "#282828",
    marginTop: 20,
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  icones: {
    display: "flex",
    alignItems: "flex-start",
    width: "100%",
    flexDirection: "row",
    marginTop: 20,
    gap: 15,
  },
  titulo: {
    color: "#ed145b",

    fontWeight: "bold",
    fontSize: 20,
  },
  descricao: {
    color: "#fff",
  },
  flat: {
    width: "100%",
  },
  image: {
    width: "90%",
    height: 200,
    borderRadius: 10,
  },
  ind: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
});

export default styles;

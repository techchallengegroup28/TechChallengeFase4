import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151819",
  },
  content:{
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  newPostButton: {
    width: "100%",
    padding: 12,
    backgroundColor: "#ed145b",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  newPostText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomColor: '#ed145b',
    borderBottomWidth: 1,
  },
  idHeader: {
    color: '#ed145b',
    fontWeight: 'bold',
    width: '10%',
  },
  nomeHeader: {
    color: '#ed145b',
    fontWeight: 'bold',
    width: '35%',
  },
  tipo_usuarioHeader: {
    color: '#ed145b',
    fontWeight: 'bold',
    width: '35%',
  },
  actionsHeader: {
    color: '#ed145b',
    fontWeight: 'bold',
    width: '20%',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomColor: '#ed145b',
    borderBottomWidth: 1,
  },
  id: {
    color: '#fff',
    width: '10%',
  },
  nome: {
    color: '#fff',
    width: '35%',
  },
  tipo_usuario:{
    color: '#fff',
    width: '35%',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '20%',
  },
});

export default styles;

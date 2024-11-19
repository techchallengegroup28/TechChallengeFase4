import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ccc",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#151819",
    borderRadius: 8,
    backgroundColor: "#151819",
    color: "#fff",
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#151819",
  },
  picker: {
    color: "#fff", // Cor do texto selecionado
    height: 50, // Altura do Picker
  },
  pickeritem: {
    color: "#fff", // Cor dos itens dentro do Picker
  },
});

export default styles;

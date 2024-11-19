import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f50057",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 8,
  },
  fileInput: {
    backgroundColor: "#1e1e1e",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#333",
    marginBottom: 20,
    alignItems: "center",
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#333",
  },
  textArea: {
    textAlignVertical: "top",
    height: 90,
    marginLeft: 1,
  },
  button: {
    backgroundColor: "#f50057",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  error: {
    color: "#f50057",
    marginBottom: 8,
  },
});
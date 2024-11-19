import { Alert } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type UsuariosScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

export const redirecionarParaLogin = ({ navigation }: UsuariosScreenProps) => {
  Alert.alert("Aviso", "Login Expirado!");
  navigation.reset({
    index: 0,
    routes: [{ name: "Login" }],
  });
};

export const redirecionarParaHome = ({ navigation }: UsuariosScreenProps) => {
  navigation.reset({
    index: 0,
    routes: [{ name: "Home" }],
  });
};

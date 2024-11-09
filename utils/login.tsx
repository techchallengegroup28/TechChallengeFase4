import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/User";

const tokenVerify = async () => {
  const userToken = await AsyncStorage.getItem("token");
  if (!userToken) {
    return null;
  } else {
    const decoded = jwtDecode(userToken) as User;
    const user: User = {
      id: decoded.id,
      nome: decoded.nome,
      email: decoded.email,
      tipo_usuario: decoded.tipo_usuario,
      tipo_usuario_id: decoded.tipo_usuario_id,
    };
    return { user };
  }
};

export default tokenVerify;

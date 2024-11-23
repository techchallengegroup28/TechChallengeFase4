import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/User";
import api from "./api";
import { Alert } from "react-native";

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

const updateToken = async (): Promise<boolean> => {
  try {
    const userToken = await AsyncStorage.getItem("token");
    if (!userToken) {
      return false;
    }
    const decoded = jwtDecode(userToken) as User;

    if (!decoded.email || !userToken) {
      console.error("Email ou token ausente");
      return false;
    }

    const response = await api.post("auth/refresh-token", {
      email: decoded.email,
      token: userToken,
    });
    const newToken = response.data.access_token;

    if (newToken) {
      await AsyncStorage.setItem("token", newToken);
      console.log("Token atualizado com sucesso");
      return true;
    } else {
      console.error("Erro ao obter o novo token");
      Alert.alert("Erro", "Erro ao obter o novo token");
      return false;
    }
  } catch (error) {
    console.error("Erro ao atualizar token", error);
    return false;
  }
};

export { tokenVerify, updateToken };

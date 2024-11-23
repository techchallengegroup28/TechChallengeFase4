import { Alert } from "react-native";
import api from "../utils/api";
import { AxiosError } from "axios";

export interface payload {
  titulo: string;
  descricao: string;
  conteudo: string;
  imagem?: string | File | null;
}

export const createPost = async (
  payload: payload,
  token: string
): Promise<void> => {
  try {
    const response = await api.post(`posts`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    });

    if (response.data.error) {
      Alert.alert(response.data.error);
    }
  } catch (error: AxiosError | any) {
    if (error.response) {
      Alert.alert(error.response.data.error);
    } else {
      Alert.alert(
        "Erro",
        `Não foi possível conectar ao servidor. Error: ${error.message}`
      );
    }
  }
};

export const updatePost = async (
  payload: payload,
  id: number,
  token: string
): Promise<void> => {
  try {
    const response = await api.put(`posts/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    });

    if (response.data.error) {
      Alert.alert(response.data.error);
    }
  } catch (error: AxiosError | any) {
    if (error.response) {
      Alert.alert(error.response.data.error);
    } else {
      Alert.alert(
        "Erro",
        `Não foi possível conectar ao servidor. Error: ${error.message}`
      );
    }
  }
};

export const getPostById = async (id: number): Promise<any> => {
  try {
    const response = await api.get(`posts/${id}`);

    if (response.data.error) {
      Alert.alert(response.data.error);
    }

    return response.data;
  } catch (error: AxiosError | any) {
    if (error.response) {
      Alert.alert(error.response.data.error);
    } else {
      Alert.alert(
        "Erro",
        `Não foi possível conectar ao servidor. Error: ${error.message}`
      );
    }
  }
};

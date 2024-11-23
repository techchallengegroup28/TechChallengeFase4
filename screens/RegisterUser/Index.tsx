import { View, Text, TextInput, Button, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import api from "../../utils/api";
import { User } from "../../types/User";
import {
  redirecionarParaLogin,
  redirecionarParaUsuarios,
} from "../../utils/navegationUtils";
import styles from "./styles";
import { AxiosError } from "axios";

type UsuariosScreenProps = {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any>;
};

const RegisterUser = ({ navigation, route }: UsuariosScreenProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState(1);
  const [usuario, setUser] = useState<User>();

  useEffect(() => {
    if (route.params && route.params.id) {
      getUser(route.params.id);
    }
  }, [route.params]);

  const preencherCampos = (user: User) => {
    setName(user.nome || "");
    setEmail(user.email || "");
    setUserType(user.tipo_usuario_id ? user.tipo_usuario_id : 1);
  };

  const postUser = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await api.post(
        "users",
        {
          nome: name,
          email: email,
          senha: password,
          tipo_usuario_id: userType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );

      if (response.data.error) {
        Alert.alert("Erro: ", response.data.error);
      } else {
        Alert.alert("Usuário cadastrado com sucesso!");
        redirecionarParaUsuarios({ navigation });
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

  const putUser = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await api.put(
        `users/${usuario?.id}`,
        {
          nome: name,
          email: email,
          senha: password,
          tipo_usuario_id: userType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );

      if (response.data.error) {
        Alert.alert("Erro: ", response.data.error);
      } else {
        Alert.alert("Sucesso", "Usuário atualizado com sucesso!");
        redirecionarParaUsuarios({ navigation });
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

  const getUser = async (idUsuario: number) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await api.get(`users/${idUsuario}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.error) {
        Alert.alert(response.data.error);
      } else {
        const user = response.data as User;
        setUser(user);
        preencherCampos(user);
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

  const handleSalvar = async () => {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      redirecionarParaLogin({ navigation });
      return;
    }

    if (usuario?.id) {
      putUser();
    } else {
      if (!name || !email || !password || !userType) {
        Alert.alert("Erro", "Por favor, preencha todos os campos!");
        return;
      }
      postUser();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Senha</Text>
      {usuario?.id && (
        <Text style={styles.passwordLabel}>Preencha para alterar a senha</Text>
      )}
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Text style={styles.label}>Tipo de Usuário</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={userType}
          selectionColor={"#ccc"}
          onValueChange={(itemValue) => setUserType(itemValue)}
          style={styles.picker}
          itemStyle={styles.pickeritem}
        >
          <Picker.Item label="Professor" value={1} />
          <Picker.Item label="Aluno" value={2} />
        </Picker>
      </View>

      <Button
        title={usuario?.id ? "Atualizar" : "Cadastrar"}
        onPress={handleSalvar}
        color="#ed145b"
      />
    </View>
  );
};

export default RegisterUser;

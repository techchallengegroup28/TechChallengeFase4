import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, Alert, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../utils/api";
import tokenVerify from "../../utils/login";

import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
type LoginScreenProps = {
  navigation: StackNavigationProp<any>;
  route: RouteProp<any>;
};

const Login = ({ navigation }: LoginScreenProps) => {
  useEffect(() => {
    const checkToken = async () => {
      const user = await tokenVerify();
      if (user) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      }
    };
    checkToken();
  }, [navigation]);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const handleLogin = async () => {
    try {
      const response = await api.post("auth/login", {
        email,
        senha,
      });

      if (response.data.error) {
        Alert.alert(response.data.error);
      } else {
        await AsyncStorage.setItem("token", response.data.access_token);
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      Alert.alert(
        "Erro",
        "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FIAP Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ccc"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ed145b",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#151819",
    borderRadius: 8,
    backgroundColor: "#151819",
    color: "#fff",
  },
  button: {
    width: "100%",
    padding: 12,
    backgroundColor: "#ed145b",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Login;

import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, Alert, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../utils/api";
import { tokenVerify } from "../../utils/login";

import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import styles from "./styles";
import { AxiosError } from "axios";
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
    } catch (error: AxiosError | any) {
      if (error.response) {
        Alert.alert(error.response.data.error);
      }
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

export default Login;

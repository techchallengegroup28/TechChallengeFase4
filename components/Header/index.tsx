import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import styles from "./styles";
import { User } from "../../types/User";
import { tokenVerify, updateToken } from "../../utils/login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import capitalizeFirstLetter from "../../utils/capitalize";
import { RootStackParamList } from "../../types/navigation";
import { Link, useFocusEffect } from "@react-navigation/native";

type HeaderProps<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
};

const Header = <T extends keyof RootStackParamList>({
  navigation,
}: HeaderProps<T>) => {
  const [user, setUser] = useState<User>();

  // Função para verificar e atualizar o token, se necessário
  useFocusEffect(
    React.useCallback(() => {
      const checkTokenAndUpdate = async () => {
        const tokenUpdated = await updateToken(); // Atualiza o token se necessário
        if (tokenUpdated) {
          const userData = await tokenVerify(); // Verifica e obtém o usuário
          if (!userData) {
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          } else {
            setUser(userData.user);
          }
        } else {
          const userData = await tokenVerify(); // Verifica o token sem atualização
          if (!userData) {
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          } else {
            setUser(userData.user);
          }
        }
      };

      checkTokenAndUpdate();
    }, [navigation])
  );

  // Função para deslogar
  async function sair() {
    Alert.alert(
      "Confirmar Saída",
      "Você tem certeza que deseja sair?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelado"),
          style: "cancel",
        },
        {
          text: "Sair",
          onPress: async () => {
            await AsyncStorage.removeItem("token");
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          },
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <View style={styles.header}>
      {navigation.canGoBack() && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={20} color="#ed145b" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>
        Bem-vindo, {capitalizeFirstLetter(user?.nome ?? "")}!
      </Text>
      {user?.tipo_usuario === "professor" && (
        <TouchableOpacity>
          <Link to="/Users">
            <Icon name="settings" size={24} color="#ed145b" />
          </Link>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={sair} style={styles.button}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

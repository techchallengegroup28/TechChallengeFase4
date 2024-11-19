import styles from "./styles";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import tokenVerify from "../../utils/login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import capitalizeFirstLetter from "../../utils/capitalize";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { User } from "../../types/User";

type HeaderProps = {
  navigation: NativeStackNavigationProp<any>;
};

const Header = ({ navigation }: HeaderProps) => {
  const [user, setUser] = useState<User>();

  // Verificação de autenticidade de token
  useEffect(() => {
    const checkToken = async () => {
      const user = await tokenVerify();
      if (!user) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      } else {
        setUser(user.user);
      }
    };
    checkToken();
  }, [navigation]);

  const handleNavegarParaUsuarios = () => {
  //  navigation.navigate('RegisterUser', { user });
    navigation.navigate('RegisterUser',{ id: 11});
  }

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
          <Icon name="settings" size={24} color="#ed145b" onPress={handleNavegarParaUsuarios}/>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={sair} style={styles.button}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

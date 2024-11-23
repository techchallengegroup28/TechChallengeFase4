import styles from "./styles";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, View, Text, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Header from "../../components/Header";
import { User } from "../../types/User";
import api from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import { RootStackParamList } from "../../types/navigation";
import { useFocusEffect } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "Users">;

const Users: React.FC<Props> = ({ navigation, route }) => {
  const [users, setUsers] = useState<User[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;
      const response = await api.get<User[]>("users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Falha ao encontrar usuarios", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUsers();
    }, [])
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  const onDelete = async (id: number) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Você tem certeza que deseja excluir esse usuario? ",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelado"),
          style: "cancel",
        },
        {
          text: "Comfirmar",
          onPress: async () => {
            setLoading(true);
            try {
              const token = await AsyncStorage.getItem("token");
              if (!token) return;
              await api.delete(`/users/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              setUsers((prevUsers) =>
                (prevUsers || []).filter((user) => user.id !== id)
              );
            } catch (error) {
              console.error("Erro ao excluir usuário", error);
              Alert.alert("Erro", "Ocorreu um erro ao excluir o usuário.");
            } finally {
              setLoading(false);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.content}>
        <Text style={styles.header}>Listagem de usuários</Text>
        <TouchableOpacity
          style={styles.newPostButton}
          onPress={() => navigation.navigate("RegisterUser", { id: null })}
        >
          <Text style={styles.newPostText}>Criar novo usuário</Text>
        </TouchableOpacity>

        <View style={styles.listHeader}>
          <Text style={styles.idHeader}>Id</Text>
          <Text style={styles.nomeHeader}>Nome</Text>
          <Text style={styles.tipo_usuarioHeader}>Tipo do usuário</Text>
          <Text style={styles.actionsHeader}>Ações</Text>
        </View>

        <FlatList
          data={users}
          keyExtractor={(user) => user.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.id}>{item.id}</Text>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.tipo_usuario}>{item.tipo_usuario}</Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("RegisterUser", { id: item.id })
                  }
                >
                  <Icon name="pencil" size={20} color="#ed145b" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDelete(item.id)}>
                  <Icon name="trash" size={20} color="#ed145b" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Users;

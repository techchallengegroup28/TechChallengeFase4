import styles from "./styles";
import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Header from "../../components/Header";
import Icon from "react-native-vector-icons/Ionicons";
import { TextInput } from "react-native-gesture-handler";
import api from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "../../types/navigation";
import { User } from "../../types/User";
import { tokenVerify } from "../../utils/login";
import { useFocusEffect } from "@react-navigation/native";

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

type Post = {
  id: number;
  titulo: string;
  descricao: string;
  datapostagem: string;
  dataatualizacao: string;
  conteudo: string;
  imagem: string | null;
};

const Home: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [user, setUser] = React.useState<User>();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const response = await api.get<Post[]>("posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setData(response.data);
      } else {
        console.error(`Erro ao buscar os posts: Status ${response.status}`);
        Alert.alert("Erro", "Ocorreu um erro ao buscar os posts.");
      }
    } catch (error) {
      console.error("Erro ao buscar os posts:", error);
      Alert.alert("Erro", "Ocorreu um erro ao buscar os posts.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

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
    fetchPosts();
  }, []);

  const filteredData = data.filter((post) =>
    post.titulo.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeletePost = (postId: number) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Você realmente deseja excluir este post?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              const token = await AsyncStorage.getItem("token");
              await api.delete(`posts/${postId}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              setData((prevData) =>
                prevData.filter((item) => item.id !== postId)
              );
            } catch (error) {
              console.error("Erro ao excluir o post:", error);
              Alert.alert("Erro", "Ocorreu um erro ao excluir o post.");
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
        {user?.tipo_usuario === "professor" && (
          <TouchableOpacity
            style={styles.novo}
            onPress={() => navigation.navigate("GerenciarPost", { idPost: 0 })}
          >
            <Text style={styles.novoText}>Novo Post</Text>
          </TouchableOpacity>
        )}
        <View style={styles.pesquisar}>
          <Icon name="search" size={30} color="#ed145b" />
          <TextInput
            style={styles.pesquisarInput}
            placeholder="Pesquise Aqui..."
            placeholderTextColor="#ed145b"
            value={search}
            onChangeText={setSearch}
          />
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#ed145b" />
        ) : (
          <FlatList
            style={styles.flat}
            data={filteredData}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <TouchableOpacity
                  style={styles.ind}
                  onPress={() => {
                    navigation.navigate("Individual", { id: item.id });
                  }}
                >
                  <Image
                    source={{
                      uri: item.imagem
                        ? `data:image/webp;base64,${item.imagem.replace(
                            /^dataimage\/(webp|jpeg)base64/,
                            ""
                          )}`
                        : "https://via.placeholder.com/150",
                    }}
                    style={styles.image}
                  />
                  <Text style={styles.titulo}>{item.titulo}</Text>
                  <Text style={styles.descricao}>{item.descricao}</Text>
                </TouchableOpacity>
                {user?.tipo_usuario === "professor" && (
                  <View style={styles.icones}>
                    <TouchableOpacity onPress={() => handleDeletePost(item.id)}>
                      <Icon name="trash-outline" size={25} color="#ed145b" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("GerenciarPost", {
                          idPost: item.id,
                        })
                      }
                    >
                      <Icon name="pencil-outline" size={25} color="#ed145b" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import api from "../../utils/api";
import Header from "../../components/Header";
import { RootStackParamList } from "../../types/navigation";
import { format } from "date-fns";

// Define the interface for navigation props
type Props = NativeStackScreenProps<RootStackParamList, "Individual">;

// Define the interface for post data
type Post = {
  id: number;
  titulo: string;
  descricao: string;
  datapostagem: string;
  dataatualizacao: string;
  conteudo: string;
  imagem: string | null;
};

const Individual: React.FC<Props> = ({ navigation, route }) => {
  const { id } = route.params; // Extract the ID from route params
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const formattedDataPostagem = post?.datapostagem
    ? format(new Date(post.datapostagem), "dd/MM/yyyy")
    : "";
  const formattedDataAtualizacao = post?.dataatualizacao
    ? format(new Date(post.dataatualizacao), "dd/MM/yyyy")
    : "";

  // Function to fetch post data
  const fetchPost = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const response = await api.get<Post>(`posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPost(response.data);
    } catch (error) {
      console.error(`Error ao buscar post ${id}:`, error);
      Alert.alert("Erro", "Ocorreu um erro ao buscar o post.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost(); // Fetch post on component mount
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header navigation={navigation} />
        <ActivityIndicator size="large" color="#ed145b" />
      </SafeAreaView>
    );
  }

  if (!post) {
    return (
      <SafeAreaView style={styles.container}>
        <Header navigation={navigation} />
        <Text style={styles.errorText}>Erro ao carregar o post.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.item}>
          <Image
            source={{
              uri: post.imagem
                ? `data:image/webp;base64,${post.imagem.replace(
                    /^dataimage\/(webp|jpeg)base64/,
                    ""
                  )}`
                : "https://via.placeholder.com/150",
            }}
            style={styles.image}
          />
          <Text style={styles.titulo}>{post.titulo}</Text>
          <Text style={styles.descricao}>{post.descricao}</Text>
          <Text style={styles.conteudo}>{post.conteudo}</Text>
          <View style={styles.dts}>
            <Text style={styles.dt}>Postado dia: {formattedDataPostagem}</Text>
            <Text style={styles.dt}>
              Última Atualização: {formattedDataAtualizacao}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Individual;

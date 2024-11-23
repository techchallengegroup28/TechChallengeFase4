import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { styles } from "./styles";
import {
  createPost,
  updatePost,
  getPostById,
  payload,
} from "../../Services/PostService";
import * as ImagePicker from "expo-image-picker";
import { RouteProp } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { tokenVerify } from "../../utils/login";
import { User } from "../../types/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { redirecionarParaLogin } from "../../utils/navegationUtils";

type GerenciarPostScreenRouteProp = RouteProp<
  RootStackParamList,
  "GerenciarPost"
>;

type Props = NativeStackScreenProps<RootStackParamList, "GerenciarPost">;

interface PostFormValues {
  titulo: string;
  descricao: string;
  conteudo: string;
  imagem: File | null | string;
}

interface PostFormProps {
  idPost?: number;
}

type PostScreenProps = {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any>;
};

const EditarPost: React.FC<Props> = ({ navigation, route }) => {
  const [user, setUser] = React.useState<User>();
  const { idPost } = route.params;
  const [serverMessage, setServerMessage] = useState<string>();
  const [initialValues, setInitialValues] = useState<PostFormValues>({
    titulo: "",
    descricao: "",
    conteudo: "",
    imagem: null,
  });

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
    if (idPost) {
      (async () => {
        try {
          const post = await getPostById(idPost);
          setInitialValues({
            titulo: post.titulo,
            descricao: post.descricao,
            conteudo: post.conteudo,
            imagem: post.imagem || null,
          });
        } catch (error) {
          Alert.alert("Erro", "Não foi possível carregar o post.");
        }
      })();
    }
  }, [route.params]);

  const validationSchema = Yup.object().shape({
    titulo: Yup.string().required("O título é obrigatório"),
    descricao: Yup.string().required("A descrição é obrigatória"),
    conteudo: Yup.string().required("O conteúdo é obrigatório"),
  });

  const handleImagePicker = async (
    setFieldValue: (field: string, value: any) => void
  ) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão necessária",
        "Permita o acesso à galeria para selecionar uma imagem."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets) {
      const imageBase64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setFieldValue("imagem", imageBase64);
    }
  };

  const handleSubmit = async (values: PostFormValues) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Erro", "Token não encontrado.");
        redirecionarParaLogin({ navigation });
        return;
      }

      const payload: payload = {
        titulo: values.titulo,
        descricao: values.descricao,
        conteudo: values.conteudo,
        imagem: values.imagem,
      };

      if (idPost) {
        await updatePost(payload, idPost, token);
        setServerMessage("Post atualizado com sucesso!");
      } else {
        await createPost(payload, token);
        setServerMessage("Post criado com sucesso!");
      }

      Alert.alert("Sucesso", serverMessage || "");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao enviar os dados.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criação/edição de post</Text>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
          errors,
          touched,
        }) => (
          <View>
            <Text style={styles.label}>Título</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              onChangeText={handleChange("titulo")}
              onBlur={handleBlur("titulo")}
              value={values.titulo}
              placeholder="Insira um título"
              placeholderTextColor="#aaa"
              multiline
              numberOfLines={4}
            />
            {touched.titulo && errors.titulo && (
              <Text style={styles.error}>{errors.titulo}</Text>
            )}

            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              onChangeText={handleChange("descricao")}
              onBlur={handleBlur("descricao")}
              value={values.descricao}
              placeholder="Insira uma descrição"
              placeholderTextColor="#aaa"
              multiline
              numberOfLines={4}
            />
            {touched.descricao && errors.descricao && (
              <Text style={styles.error}>{errors.descricao}</Text>
            )}

            <Text style={styles.label}>Conteúdo</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              onChangeText={handleChange("conteudo")}
              onBlur={handleBlur("conteudo")}
              value={values.conteudo}
              placeholder="Insira um conteúdo"
              placeholderTextColor="#aaa"
              multiline
              numberOfLines={4}
            />
            {touched.conteudo && errors.conteudo && (
              <Text style={styles.error}>{errors.conteudo}</Text>
            )}

            <Text style={styles.label}>Selecione uma imagem</Text>
            <TouchableOpacity
              style={styles.fileInput}
              onPress={() => handleImagePicker(setFieldValue)}
            >
              <Text style={styles.buttonText}>
                {values.imagem ? "Imagem Selecionada" : "Escolher Imagem"}
              </Text>
            </TouchableOpacity>

            <Button
              title="Salvar"
              onPress={() => handleSubmit()}
              color="#f50057"
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default EditarPost;

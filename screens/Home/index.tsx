import styles from "./styles";
import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Header from "../../components/Header";

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const Home: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Bem-vindo à Home!</Text>
        <Text style={styles.descriptionText}>
          Aqui é onde o conteúdo principal será exibido.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;

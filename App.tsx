// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home/index";
import Login from "./screens/Login/index";
import RegisterUser from "./screens/RegisterUser/Index";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }} // Oculta o cabeçalho
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterUser"
          component={RegisterUser}
          options={{ 
            headerShown: true, 
            title: "Cadastro de Usuários",             
            headerStyle: { 
              backgroundColor: "#000",              // Cor de fundo do header
              borderBottomWidth: 1,                 // Espessura da linha
              borderBottomColor: "#ed145b",         // Cor da linha divisória
            }, 
            headerTintColor: "#ed145b",             // Cor do botão de voltar
            headerTitleStyle: { color: "#ed145b" }, // Cor do título
            headerShadowVisible: true,              // Sombra do header
          }}           
        />        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

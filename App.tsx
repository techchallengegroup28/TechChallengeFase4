import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Individual from "./screens/Individual";
import Users from "./screens/Users";
import RegisterUser from "./screens/RegisterUser/Index";
import EditarPost from "./screens/GerenciarPost";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootStackParamList } from "./types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Individual"
            component={Individual}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GerenciarPost"
            component={EditarPost}
            options={{
              headerShown: true,
              title: "Cadastro de Posts",
              headerStyle: { backgroundColor: "#000" },
              headerTintColor: "#ed145b",
              headerTitleStyle: { color: "#ed145b" },
            }}
          />
          <Stack.Screen
            name="Users"
            component={Users}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterUser"
            component={RegisterUser}
            options={{
              headerShown: true,
              title: "Cadastro de Usuários",
              headerStyle: { backgroundColor: "#000" },
              headerTintColor: "#ed145b",
              headerTitleStyle: { color: "#ed145b" },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;

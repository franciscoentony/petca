import React, { useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider, AuthContext } from "./src/context/AuthContext";

import Index from "./src/screens/Index";
import Continue from "./src/screens/Continue";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import MainTabs from "./src/screens/(main)/MainTabs";
import DetalhesAnimal from "./src/screens/(main)/DetalhesAnimal";

import "./global.css";

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { isLoading, userToken } = useContext(AuthContext);

  console.log("ESTADO ATUAL -> isLoading:", isLoading, "| userToken:", userToken);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#F9F7F3]">
        <ActivityIndicator size="large" color="#F7A072" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      {userToken == null ? (
        <>
          <Stack.Screen
            name="Index"
            component={Index}
            options={{
              headerTitle: "",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Continue"
            component={Continue}
            options={{
              headerTitle: "",
              headerTransparent: true,
              headerBackTitleVisible: false,
              headerBackTitle: "",
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerTitle: "",
              headerTransparent: true,
              headerBackTitleVisible: false,
              headerBackTitle: "",
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerTitle: "",
              headerTransparent: true,
              headerBackTitleVisible: false,
              headerBackTitle: "",
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="MainApp"
            component={MainTabs}
            options={{
              headerShown: false,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="DetalhesAnimal"
            component={DetalhesAnimal}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
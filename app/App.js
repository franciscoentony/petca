import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();

import Index from "./src/screens/Index";
import Continue from "./src/screens/Continue";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";

import "./global.css";

export default function App() {
  return (
    <NavigationContainer>
      {/*<StatusBar style="auto" translucent />*/}
      <Stack.Navigator
        initialRouteName="Index"
        screenOptions={{
          headerBackTitleVisible: false,
          //animation: "slide_from_bottom",
          //headerShown: false,
        }}
      >
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

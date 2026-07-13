import React from "react";
import { StyleSheet, View } from "react-native";
import {
  createBottomTabNavigator,
  BottomTabBar,
} from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import Home from "./Home";
import CadastrarAdocao from "./CadastrarAdocao";
import Perfil from "./Perfil";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => (
        <View style={styles.tabBarWrapper}>
          <BottomTabBar {...props} />
        </View>
      )}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#E9976A",
        tabBarInactiveTintColor: "#A8A29E",
        tabBarStyle: {
          backgroundColor: "rgba(253, 251, 247, 0.75)",
          borderTopWidth: 0,
          elevation: 0,
          height: 64,
          borderRadius: 32,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginBottom: 8,
        },
        tabBarIconStyle: {
          marginTop: 6,
        },
        tabBarBackground: () => (
          <BlurView
            intensity={70}
            tint="light"
            style={{
              ...StyleSheet.absoluteFillObject,
              borderRadius: 32,
              overflow: "hidden",
            }}
          />
        ),
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "HomeTab") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "AdocaoTab") {
            iconName = focused ? "add" : "add-outline";
          } else if (route.name === "Perfil") {
            iconName = focused ? "person" : "person-outline";
          }

          const iconSize = route.name === "AdocaoTab" ? 26 : 22;

          return <Ionicons name={iconName} size={iconSize} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          tabBarLabel: "Início",
        }}
      />
      <Tab.Screen
        name="AdocaoTab"
        component={CadastrarAdocao}
        options={{
          tabBarLabel: "Publicar",
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarLabel: "Perfil",
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarWrapper: {
    position: "absolute",
    bottom: 30,
    width: 180,
    alignSelf: "center",
    borderRadius: 32,

    shadowColor: "#E9976A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    backgroundColor: "transparent",
    overflow: "visible",
  },
});
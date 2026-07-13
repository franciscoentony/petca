import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState, useContext } from "react";

import Input from "../components/Inputs/Input";
import ButtonPrimary from "../components/ButtonPrimary";

// 1. Importa o Contexto de Autenticação
import { AuthContext } from "../../src/context/AuthContext"; // Ajusta o caminho relativo se necessário

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Consome as funções e estados globais do AuthContext
  const { login, isLoading } = useContext(AuthContext);

  async function handleSubmit() {
    if (!email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    await login(email, password);
  }

  return (
    <ScrollView>
      <View className="w-screen h-screen bg-[#F9F7F3] flex pt-30 px-10 pb-10">
        <View className="flex gap-10">
          <View className="w-full flex items-center mb-8">
            <Image
              source={require("../../assets/petca-logo(laranja).png")}
              className="w-40 h-13 object-cover"
            />
          </View>
          <Text className="text-[2.5rem] font-semibold">Entrar</Text>
        </View>

        <View className="flex gap-5 mt-5">
          <Input
            label={"Email"}
            placeholder={"Digite seu Email"}
            icon={"envelope"}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <View className="w-full flex items-end mb-10">
            <Input
              label={"Senha"}
              placeholder={"Digite sua Senha"}
              icon={"lock"}
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity>
              <Text className="text-xl font-semibold text-[#F7A072]">Esqueceu a Senha?</Text>
            </TouchableOpacity>
          </View>

          {/* 4. Mostra um indicador de carregamento enquanto valida com a API */}
          {isLoading ? (
            <ActivityIndicator size="large" color="#F7A072" />
          ) : (
            <ButtonPrimary onPress={handleSubmit}>Entrar</ButtonPrimary>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
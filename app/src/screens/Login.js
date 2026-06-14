import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import Input from "../components/Inputs/Input";
import ButtonPrimary from "../components/ButtonPrimary";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {
    alert(`Email: ${email}\nSenha: ${password}`)
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
          <ButtonPrimary onPress={handleSubmit}>Entrar</ButtonPrimary>
        </View>
      </View>
    </ScrollView>
  );
}

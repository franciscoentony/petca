import { View, Text, ScrollView, Image } from 'react-native';
import React from 'react';

import ButtonPrimary from '../components/ButtonPrimary';
import ButtonSecundary from '../components/ButtonSecundary';

export default function Continue({ navigation }) {
  return (
    <ScrollView >
        <View className="w-screen h-screen bg-[#F9F7F3] flex pt-35 px-10 justify-between pb-10">
          <View className="flex gap-10">

            <Image source={require('../../assets/petca-logo(laranja).png')} className="w-40 h-13 object-cover"/>

            <Text className="text-4xl font-semibold">Como gostaria de continuar?</Text>
          </View>
          <View className="flex gap-5">
            <ButtonPrimary onPress={() => navigation.navigate("Login")}>Entrar</ButtonPrimary>

            <Text className="w-full text-center font-semibold text-xl text-stone-600">Não tem conta ainda?</Text>
            
            <ButtonSecundary onPress={() => navigation.navigate("Register")}>Cadastrar</ButtonSecundary>
          </View>
        </View>
    </ScrollView>
  )
}
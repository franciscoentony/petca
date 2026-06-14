import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome6 } from "@expo/vector-icons";

export default function Index({ navigation }) {
    return (
      <ScrollView>
        <View className="w-screen h-screen bg-[#F9F7F3] flex items-center">
          <View className="w-full bg-[#F7A072] h-140 rounded-[3rem] overflow-hidden">
            <Image source={require('../../assets/cao_e_gato.jpeg')} className="w-150 h-150 object-contain relative right-10"/>
          </View>
          <View className="w-full px-10 mt-10 flex gap-4">
            <Image source={require('../../assets/petca-logo(laranja).png')} className="w-40 h-13 object-cover"/>
              <Text className="text-4xl font-bold">Seja bem vindo(a)!</Text>
              <Text className="text-xl text-gray-500">Nós somos uma instituição sem fins lucrativos de resgate de animais em situação de rua. É um prazer poder contar com você nessa missão!</Text>

              <TouchableOpacity activeOpacity={0.7} className="bg-[#0FA3B1] flex flex-row w-45 p-4 rounded-2xl justify-between items-center  shadow-xl/5"
              onPress={() => navigation.navigate("Continue")}
              >
                <Text className="flex text-white text-xl font-semibold">Vamos lá</Text>
                  <FontAwesome6 name="chevron-right" size={20} color="white" />
              </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
}
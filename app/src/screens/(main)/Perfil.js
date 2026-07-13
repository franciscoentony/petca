import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useContext } from 'react'
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context'; 

import { AuthContext } from '../../context/AuthContext'; 
import CardProfile from '../../components/CardProfile';

export default function Perfil() {
  const { user, logout } = useContext(AuthContext);

  const username = user?.name 
    ? user.name.toLowerCase().replace(/\s+/g, '') 
    : 'entony';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9F7F3' }}>
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        
        {/* --- HEADER --- */}
        <View className="flex-row justify-between items-center my-4">
          <View className="w-8" /> 
          
          <View className="flex-row items-center gap-2">
            <FontAwesome6 name="paw" size={26} color="#F7A072" />
            <Text className="text-2xl font-bold text-[#F7A072]" style={{ fontFamily: 'sans-serif' }}>PetCa</Text>
          </View>

          <View className="relative">
            <Image 
              source={{ uri: 'https://github.com/franciscoentony.png' }} 
              className="w-11 h-11 rounded-full"
            />
            <View className="absolute bottom-0 right-0 w-3 h-3 bg-[#F7A072] rounded-full border-2 border-[#F9F7F3]" />
          </View>
        </View>

        {/* --- SAUDAÇÃO --- */}
        <View className="my-4">
          <Text className="text-3xl font-bold text-[#2D2D2D]">
            Olá, {user?.name?.split(' ')[0] || "Entony"}
          </Text>
          <Text className="text-gray-500 text-base mt-0.5">
            Seja bem vindo de volta ao seu espaço
          </Text>
        </View>

        {/* --- CARD PRINCIPAL ESCURO --- */}
        <CardProfile user={user}/>

        {/* --- ONGS VINCULADAS --- */}
        <View className="my-4">
          <Text className="text-xl font-bold text-[#2D2D2D] mb-3">ONGs vinculadas</Text>
          
          <View className="flex-row gap-4">
            <View className="items-center">
              <Image source={{ uri: 'https://picsum.photos/100' }} className="w-16 h-16 rounded-full" />
              <Text className="text-sm font-medium text-[#2D2D2D] mt-1">ONG 1</Text>
            </View>
            <View className="items-center">
              <Image source={{ uri: 'https://picsum.photos/101' }} className="w-16 h-16 rounded-full" />
              <Text className="text-sm font-medium text-[#2D2D2D] mt-1">ONG 2</Text>
            </View>
            <View className="items-center">
              <Image source={{ uri: 'https://picsum.photos/102' }} className="w-16 h-16 rounded-full" />
              <Text className="text-sm font-medium text-[#2D2D2D] mt-1">ONG 3</Text>
            </View>
          </View>
        </View>

        {/* --- CONFIGURAÇÕES --- */}
        <View className="my-2 gap-3">
          <Text className="text-xl font-bold text-[#2D2D2D] mb-1">Configurações</Text>
          
          <TouchableOpacity className="flex-row items-center justify-between bg-white p-4 rounded-2xl shadow-sm">
            <View className="flex-row items-center gap-4">
              <FontAwesome6 name="user" size={18} color="#9CA3AF" solid />
              <Text className="text-base font-semibold text-[#2D2D2D]">Meus Dados</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between bg-white p-4 rounded-2xl shadow-sm">
            <View className="flex-row items-center gap-4">
              <FontAwesome6 name="hands" size={18} color="#9CA3AF" />
              <Text className="text-base font-semibold text-[#2D2D2D]">Se associar a ongs</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          {/* --- BOTÃO SAIR DA CONTA --- */}
          <TouchableOpacity 
            onPress={logout}
            className="flex-row items-center justify-center bg-[#E54B4B] p-4 rounded-2xl mt-4 shadow-sm"
          >
            <FontAwesome6 name="arrow-right-from-bracket" size={18} color="white" />
            <Text className="text-white text-base font-bold ml-2">Sair da conta</Text>
          </TouchableOpacity>
        </View>

        <View className="h-24" />
      </ScrollView>
    </SafeAreaView>
  )
}
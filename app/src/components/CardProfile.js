import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";

export default function CardProfile({ user }) {
  const username = user?.name
    ? user.name.toLowerCase().replace(/\s+/g, "")
    : "usuario";

  return (
    <View className="bg-[#2D2D2D] w-full rounded-[40px] p-6 items-center shadow-md my-2">
      {user.foto ? (
      <Image
        source={{ uri: user.foto }}
        className="w-44 h-44 rounded-3xl"
      />
      ) : (
        <View className="w-44 h-44 rounded-3xl bg-[#F7A072] flex items-center justify-center">
          <FontAwesome6 name="user" size={50} color="white"/>
        </View>
      )}

      <Text className="text-gray-400 text-sm font-medium mt-3">
        {user?.tipo_colaborador.toUpperCase() || "Contribuidor"}
      </Text>

      <Text className="text-white text-2xl font-bold mt-0.5 text-center">
        {user?.name || "Usuário"}
      </Text>

      <Text className="text-gray-400 text-sm mt-0.5">@{username}</Text>

      {/* Redes Sociais */}
      <View className="flex-row gap-5 my-4">
        <TouchableOpacity>
          <FontAwesome6 name="instagram" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome6 name="x-twitter" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome6 name="whatsapp" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Caixa de Descrição */}
      <View className="bg-white w-full rounded-3xl p-5 min-h-35 mt-2">
        <Text className="text-gray-400 text-base">
          {user?.descricao_perfil || "Descrição..."}
        </Text>
      </View>
    </View>
  );
}

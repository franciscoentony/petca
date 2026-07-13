import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function CardAnimal({ id, title, cidade, estado, banner }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("DetalhesAnimal", { id })}
      className="w-[48%] h-72 relative mb-2 border border-stone-300 rounded-3xl overflow-hidden shadow-sm"
    >
      <View className="bg-[#F7A072] w-full h-full">
        {banner ? (
          <Image
            source={{ uri: banner }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-full justify-center items-center">
            <Text className="text-white text-xs">Sem foto</Text>
          </View>
        )}
      </View>

      <View className="w-full h-35 bottom-0 px-3 py-4 gap-2 absolute bg-stone-900/60 justify-end">
        <Text className="text-white font-semibold text-lg line-clamp-2">
          {title}
        </Text>
        <View className="w-full flex-row items-center gap-2">
          <FontAwesome6 name="location-dot" size={13} color="#E7E5E4" />
          <Text className="text-stone-200 text-sm">
            {cidade}-{estado}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
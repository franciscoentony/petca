import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";
import { API } from "../../../API";

export default function DetalhesAnimal() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;

  async function buscarDetalhes() {
    try {
      const res = await fetch(`${API}animais-adocao/detalhes/${id}/`);
      const dados = await res.json();

      if (dados.foto && !dados.foto.startsWith("http")) {
        const urlBase = API.split("/api")[0];
        dados.foto = `${urlBase}${dados.foto}`.replace(
          "localhost",
          "127.0.0.1",
        );
      }

      setAnimal(dados);
    } catch (erro) {
      console.log(erro);
    } finally {
      setLoading(false);
    }
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await buscarDetalhes();
    setRefreshing(false);
  };

  useEffect(() => {
    buscarDetalhes();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#F9F7F3]">
        <ActivityIndicator size="large" color="#F7A072" />
      </View>
    );
  }

  const imageScale = scrollY.interpolate({
    inputRange: [-1000, 0],
    outputRange: [6, 1],
    extrapolateRight: "clamp",
  });

  const imageTranslateY = scrollY.interpolate({
    inputRange: [-1000, 0, 384],
    outputRange: [960, 0, -150],
    extrapolateRight: "clamp",
  });

  return (
    <View className="flex-1 bg-white">
      <Animated.Image
        source={{ uri: animal?.foto }}
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 384,
            transform: [
              { translateY: imageTranslateY },
              { scale: imageScale },
            ],
          },
        ]}
        resizeMode="cover"
      />

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.goBack()}
        className="absolute top-14 left-6 w-13 h-13 bg-white/80 rounded-full justify-center items-center z-50 shadow-md"
        style={{ elevation: 5 }}
      >
        <FontAwesome6 name="chevron-left" size={25} color="#1C1917" />
      </TouchableOpacity>

      <Animated.ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "transparent" }}
        contentContainerStyle={{ flexGrow: 1 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#4CA7B4"]}
            tintColor="#4CA7B4"
            progressViewOffset={60}
          />
        }
      >
        <View style={{ height: 344 }} />

        <View className="flex-1 bg-white rounded-t-[40px] px-6 pt-8 pb-12 shadow-xl">
          <Text className="text-3xl font-bold text-stone-900">
            {animal?.titulo}
          </Text>

          <View className="flex-row items-center gap-1 mt-2">
            <FontAwesome6 name="location-dot" size={12} color="#78716C" />
            <Text className="text-stone-500 text-lg font-medium">
              {animal?.cidade} - {animal?.estado}
            </Text>
          </View>

          <View className="flex-row items-center gap-6 mt-6">
            <View className="flex-row items-center bg-stone-100 rounded-full p-1.5 gap-5">
              <TouchableOpacity className="w-12 h-12 rounded-full bg-[#EAA375] items-center justify-center">
                <Text className="text-white font-bold text-3xl leading-6">
                  -
                </Text>
              </TouchableOpacity>
              <Text className="font-bold text-stone-800 text-xl">
                {animal?.quantidade}
              </Text>
              <TouchableOpacity className="w-12 h-12 rounded-full bg-[#EAA375] items-center justify-center">
                <Text className="text-white font-bold text-2xl leading-6">
                  +
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center gap-2">
              <FontAwesome6 name="clock" size={18} color="#1C1917" />
              <Text className="font-semibold text-stone-800 text-base">
                {animal?.estagio}
              </Text>
            </View>
          </View>

          <Text className="text-xl font-bold text-stone-900 mt-8 mb-3">
            Descrição
          </Text>
          <Text className="text-stone-700 text-base leading-6 font-normal mb-8">
            {animal?.descricao}
          </Text>

          <TouchableOpacity
            className="w-full h-14 bg-[#4CA7B4] rounded-2xl items-center justify-center shadow-sm"
            style={{ marginTop: "auto" }}
            activeOpacity={0.8}
          >
            <Text className="text-white font-bold text-lg">Agendar Visita</Text>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    </View>
  );
}
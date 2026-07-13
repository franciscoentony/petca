import React, { useState, useEffect } from "react"; // Trocamos useFocusEffect e useCallback por useEffect
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { FontAwesome6 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API } from "../../../API";

export default function Home() {
  const [animais, setAnimais] = useState([]);
  const [activate, setActivate] = useState("Recentes");

  const FILTROS = ["Recentes", "Resgatados", "Filhotes", "Adultos", "Cães"];

  async function listarAnimais() {
    try {
      const res = await fetch(`${API}animais-adocao/listar/`);
      const dados = await res.json();
      setAnimais(dados);
    } catch (erro) {
      console.log(erro);
    }
  }

  // Corrigido: O useEffect tradicional roda com segurança após a montagem completa da tela e do Tailwind
  useEffect(() => {
    listarAnimais();
  }, []);

  const tratarUrlImagem = (url) => {
    if (!url) return null;
    let urlTratada = url;
    if (!urlTratada.startsWith("http")) {
      const urlBase = API.split("/api")[0];
      urlTratada = `${urlBase}${urlTratada}`;
    }
    return urlTratada.replace("localhost", "127.0.0.1");
  };

  const destaque = animais[0];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9F7F3' }}>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        
        {/* --- HEADER --- */}
        <View className="flex-row justify-between items-center px-6 my-4">
          <View className="w-11" /> 
          
          <Image
            source={require("../../../assets/petca-logo(laranja).png")}
            className="w-32 h-10 object-contain"
          />

          <View className="relative">
            <Image 
              source={{ uri: 'https://github.com/franciscoentony.png' }} 
              className="w-11 h-11 rounded-full"
            />
            <View className="absolute bottom-0 right-0 w-3 h-3 bg-[#F7A072] rounded-full border-2 border-[#F9F7F3]" />
          </View>
        </View>

        {/* --- CARROSSEL DE FILTROS --- */}
        <View className="h-12 mt-4 mb-2">
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, gap: 20, alignItems: 'center' }}
          >
            {FILTROS.map((filtro) => {
              const isActive = activate === filtro;
              return (
                <TouchableOpacity 
                  key={filtro} 
                  onPress={() => setActivate(filtro)}
                >
                  <Text className={`text-base font-bold ${isActive ? 'text-[#00AFB9]' : 'text-gray-400'}`}>
                    {filtro}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* --- CARD DE DESTAQUE --- */}
        <View className="px-6 my-2">
          <TouchableOpacity className="bg-[#EADFA6] w-full h-64 rounded-[32px] overflow-hidden justify-end shadow-sm">
            {destaque?.foto && (
              <Image 
                source={{ uri: tratarUrlImagem(destaque.foto) }} 
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <View className="bg-[#918A62]/90 p-5 rounded-b-[32px]">
              <Text className="text-white text-2xl font-bold">
                {destaque?.titulo || "Filhotes de Pitbull"}
              </Text>
              <Text className="text-white/90 text-sm mt-0.5" numberOfLines={1}>
                {destaque?.descricao || "Filhotes resgatados para serem adotados..."}
              </Text>
              <View className="flex-row justify-between items-center mt-3">
                <Text className="text-white/80 text-xs font-semibold">
                  Quantidade: {destaque?.quantidade || 5}
                </Text>
                <View className="flex-row items-center gap-1">
                  <FontAwesome6 name="location-dot" size={12} color="white" />
                  <Text className="text-white/80 text-xs font-semibold">
                    {destaque?.cidade || "Goianinha"}-{destaque?.estado || "RN"}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <View className="flex-row justify-center items-center gap-1.5 mt-4">
            <View className="w-6 h-1.5 bg-[#00AFB9] rounded-full" />
            <View className="w-1.5 h-1.5 bg-[#00AFB9]/40 rounded-full" />
            <View className="w-1.5 h-1.5 bg-[#00AFB9]/40 rounded-full" />
            <View className="w-1.5 h-1.5 bg-[#00AFB9]/40 rounded-full" />
          </View>
        </View>

        {/* --- SEÇÃO RECENTES --- */}
        <View className="flex-row justify-between items-center px-6 mt-6 mb-2">
          <Text className="text-2xl font-bold text-[#1A1A1A]">Recentes</Text>
          <TouchableOpacity>
            <Text className="text-sm font-semibold text-gray-500">Ver todos</Text>
          </TouchableOpacity>
        </View>

        {/* --- GRADE DE CARDS --- */}
        <View className="flex-row flex-wrap justify-between px-6 pb-24">
          {animais.length <= 0 ? (
            <View className="w-full h-40 justify-center items-center">
              <Text className="text-gray-400 font-semibold">
                Nenhuma Doação Cadastrada
              </Text>
            </View>
          ) : (
            animais.map((animal, index) => {
              const urlTratada = tratarUrlImagem(animal.foto);

              return (
                <TouchableOpacity 
                  key={index}
                  className="bg-[#EADFA6] w-[48%] aspect-[0.95] rounded-[24px] overflow-hidden justify-end mb-4 shadow-sm"
                >
                  {animal.foto && (
                    <Image 
                      source={{ uri: urlTratada }} 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  <View className="bg-[#918A62]/90 p-3 rounded-b-[24px]">
                    <Text className="text-white text-base font-bold" numberOfLines={1}>
                      {animal.titulo}
                    </Text>
                    <View className="flex-row justify-between items-center mt-1">
                      <Text className="text-white/80 text-[10px] font-medium">
                        Qtd: {animal.quantidade || 5}
                      </Text>
                      <View className="flex-row items-center gap-0.5">
                        <FontAwesome6 name="location-dot" size={9} color="white" />
                        <Text className="text-white/80 text-[10px] font-medium" numberOfLines={1}>
                          {animal.cidade}-{animal.estado}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}
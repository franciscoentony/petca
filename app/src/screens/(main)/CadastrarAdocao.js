import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Input from "../../components/Inputs/Input";
import SelectInput from "../../components/Inputs/SelectInput";
import ButtonPrimary from "../../components/ButtonPrimary";

import * as ImagePicker from 'expo-image-picker';

import { API } from "../../../API";

export default function CadastrarAdocao() {
  const navigation = useNavigation();
  
  const [titulo, setTitulo] = useState("");
  const [especie, setEspecie] = useState("");
  const [estagio, setEstagio] = useState("");
  const [raca, setRaca] = useState("");
  const [descricao, setDescricao] = useState("");
  const [contato, setContato] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [quantidade, setQuantidade] = useState("1");
  const [foto, setFoto] = useState(null);

  const listaEspecies = [
    { label: "Cachorro", value: "cachorro" },
    { label: "Gato", value: "gato" },
    { label: "Pássaro", value: "passaro" },
  ];

  const listaEstagios = [
    { label: "Filhote", value: "filhote" },
    { label: "Adulto", value: "adulto" },
    { label: "Idoso", value: "idoso" },
  ];

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  }

  async function handleSubmit() {
    // Criando o FormData em vez de um objeto JSON puro
    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("especie", especie);
    formData.append("raca", raca);
    formData.append("descricao", descricao);
    formData.append("contato", contato);
    formData.append("cidade", cidade);
    formData.append("estado", estado);
    formData.append("estagio", estagio);
    formData.append("quantidade", parseInt(quantidade, 10) || 1);

    // Se houver uma foto selecionada, trata o formato para o React Native enviar
    if (foto) {
      const filename = foto.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      formData.append("foto", {
        uri: foto,
        name: filename,
        type: type,
      });
    }

    try {
      await fetch(`${API}animais-adocao/inserir/`, {
        method: "POST",
        headers: {
          // ATENÇÃO: Deixe SEM o Content-Type. O fetch define o boundary do FormData automaticamente.
        },
        body: formData,
      });

      setTitulo("");
      setEspecie("");
      setRaca("");
      setDescricao("");
      setContato("");
      setCidade("");
      setEstado("");
      setEstagio(""); 
      setQuantidade("1");
      setFoto(null);
      navigation.navigate("HomeTab");
    } catch (error) {
      console.error("Erro ao enviar anúncio:", error);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#F9F7F3]"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="w-screen min-h-screen bg-[#F9F7F3] flex pt-10 px-5 pb-40">
          <View className="flex gap-10">
            <View className="w-full flex items-center mb-8"></View>
            <Text className="text-[2.5rem] font-bold">
              Cadastrar Anúncio de Adoção
            </Text>
          </View>

          <View className="flex gap-7 mt-5">
            <Input
              label={"Título"}
              placeholder={"Digite o Título do Anúncio"}
              value={titulo}
              onChangeText={setTitulo}
            />
            <SelectInput
              label={"Espécie"}
              options={listaEspecies}
              placeholder={"Selecione a Espécie"}
              onSelect={(value) => setEspecie(value)}
            />
            <Input
              label={"Raça"}
              placeholder={"Digite a Raça do Animal"}
              value={raca}
              onChangeText={setRaca}
            />
            <SelectInput
              label={"Estágio"}
              options={listaEstagios}
              placeholder={"Selecione o Estágio"} // Corrigido aqui
              onSelect={(value) => setEstagio(value)}
            />

            <View className="flex gap-2">
              <Text className="text-base font-semibold text-gray-700">Foto do Animal</Text>
              <TouchableOpacity 
                onPress={pickImage} 
                className="w-full h-14 bg-white border border-gray-300 rounded-xl justify-center items-center"
              >
                <Text className="text-gray-500">
                  {foto ? "Alterar Foto" : "Selecionar Foto da Galeria"}
                </Text>
              </TouchableOpacity>
              {foto && (
                <Image 
                  source={{ uri: foto }} 
                  className="w-32 h-32 rounded-xl mt-2 align-self-center" 
                />
              )}
            </View>

            <Input
              label={"Quantidade"}
              placeholder={"Digite a quantidade disponível"}
              keyboardType="numeric"
              value={quantidade}
              onChangeText={setQuantidade}
            />
            <Input
              label={"Descrição"}
              placeholder={"Fale um pouco sobre o animal..."}
              paddingTop={10}
              height={"h-50"}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              value={descricao}
              onChangeText={setDescricao}
            />
            <Input
              label={"Contato (Whatsapp)"}
              placeholder={"(99) 99999-9999"}
              keyboardType="numeric"
              value={contato}
              onChangeText={setContato}
            />
            <Input
              label={"Cidade"}
              placeholder={"Digite sua Cidade"}
              value={cidade}
              onChangeText={setCidade}
            />
            <Input
              label={"Estado"}
              placeholder={"Digite seu Estado"}
              value={estado}
              onChangeText={setEstado}
            />
            <ButtonPrimary color={"bg-[#F7A072]"} onPress={handleSubmit}>
              Criar Anúncio
            </ButtonPrimary>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
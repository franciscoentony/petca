import {
  View,
  Text,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import Input from "../components/Inputs/Input";
import ButtonPrimary from "../components/ButtonPrimary";
import DateInput from "../components/Inputs/DateInput";
import SelectInput from "../components/Inputs/SelectInput";

import * as ImagePicker from "expo-image-picker";

export default function Register() {
  const { register } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    foto: "",
    dataNascimento: "",
    cep: "",
    estado: "",
    formas_contato: "",
    cidade: "",
    endereco: "",
    numero: "",
    atuacao: "",
    senha: "",
    confirmarSenha: "",
  });

  const listaAtuacao = [
    { label: "Colaborar Individual", value: "ColaborarIndividual" },
    { label: "ONG", value: "ong" },
  ];

  const formFields = [
    {
      type: "text",
      name: "nome",
      label: "Nome Completo",
      placeholder: "Digite seu nome",
      icon: "user",
    },
    {
      type: "email",
      name: "email",
      label: "Email",
      placeholder: "Digite seu Email",
      icon: "envelope",
      keyboardType: "email-address",
    },
    {
      type: "file",
      name: "foto",
      label: "Foto de Perfil",
      icon: "envelope",
    },
    {
      type: "text",
      name: "formas_contato",
      label: "Contato",
      placeholder: "Digite sua forma de contato",
      icon: "at",
      keyboardType: "email-address",
    },
    { type: "date", name: "dataNascimento", label: "Data de Nascimento" },
    {
      type: "text",
      name: "cep",
      label: "CEP",
      placeholder: "Digite CEP da sua cidade",
      icon: "location-crosshairs",
      keyboardType: "numeric",
    },
    {
      type: "text",
      name: "estado",
      label: "Estado",
      placeholder: "Digite seu Estado",
      icon: "building",
    },
    {
      type: "text",
      name: "cidade",
      label: "Cidade",
      placeholder: "Digite sua Cidade",
      icon: "city",
    },
    {
      type: "text",
      name: "endereco",
      label: "Endereço",
      placeholder: "Digite seu Endereço",
      icon: "location-dot",
    },
    {
      type: "text",
      name: "numero",
      label: "Número",
      placeholder: "Digite o Número",
      icon: "location-dot",
      keyboardType: "numeric",
    },
    {
      type: "select",
      name: "atuacao",
      label: "Atuação no Projeto",
      placeholder: "Qual será sua atuação?",
      options: listaAtuacao,
    },
    {
      type: "text",
      name: "senha",
      label: "Senha",
      placeholder: "Digite sua Senha",
      icon: "lock",
      secureTextEntry: true,
    },
    {
      type: "text",
      name: "confirmarSenha",
      label: "Confirmar Senha",
      placeholder: "Confirme sua Senha",
      icon: "lock",
      secureTextEntry: true,
    },
  ];

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  }
  const handleSubmit = async () => {
    if (formData.senha !== formData.confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    // Tratamento para a data de nascimento não quebrar o Django
    let dataFormatada = null;
    if (formData.dataNascimento && formData.dataNascimento.trim() !== "") {
      // Se a data vier no formato brasileiro DD/MM/YYYY, convertemos para YYYY-MM-DD
      if (formData.dataNascimento.includes("/")) {
        const [dia, mes, ano] = formData.dataNascimento.split("/");
        dataFormatada = `${ano}-${mes}-${dia}`;
      } else {
        dataFormatada = formData.dataNascimento;
      }
    }

    const dadosParaOBackend = {
      name: formData.nome,
      email: formData.email,
      foto: formData.foto,
      birthday: dataFormatada, // Envia YYYY-MM-DD ou null se estiver vazio
      cep: formData.cep,
      estado: formData.estado,
      cidade: formData.cidade,
      rua: formData.endereco,
      numero: formData.numero,
      tipo_colaborador:
        formData.atuacao === "ColaborarIndividual" ? "individual" : "ong",
      senha: formData.senha,
      formas_contato: formData.formas_contato,
    };

    // Agora aguardamos o resultado da requisição assíncrona
    const resultado = await register(dadosParaOBackend);

    if (!resultado.success) {
      // Se falhar, exibe na tela o campo exato que o Django rejeitou
      Alert.alert("Erro no Cadastro", JSON.stringify(resultado.errors));
    }
  };

  const renderInput = (field) => {
    switch (field.type) {
      case "text":
        return (
          <Input
            key={field.name}
            label={field.label}
            placeholder={field.placeholder}
            icon={field.icon}
            keyboardType={field.keyboardType}
            secureTextEntry={field.secureTextEntry}
            value={formData[field.name]}
            onChangeText={(value) => handleInputChange(field.name, value)}
          />
        );
      case "email":
        return (
          <Input
            key={field.name}
            label={"Email"}
            placeholder={"Digite seu Email"}
            icon={"envelope"}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={formData[field.name]}
            onChangeText={(value) => handleInputChange(field.name, value)}
          />
        );
      case "date":
        return (
          <DateInput
            key={field.name}
            label={field.label}
            value={formData[field.name]}
            onChange={(value) => handleInputChange(field.name, value)}
          />
        );
      case "select":
        return (
          <SelectInput
            key={field.name}
            label={field.label}
            options={field.options}
            placeholder={field.placeholder}
            onSelect={(value) => handleInputChange(field.name, value)}
          />
        );
      case "file":
        return (
          <View className="flex gap-2" key={field.name}>
            {/*<Text className="text-base font-semibold text-gray-700">Foto de Perfil</Text>*/}
            <TouchableOpacity
              onPress={pickImage}
              className="w-full h-14 bg-white border border-gray-300 rounded-xl justify-center items-center"
            >
              <Text className="text-gray-500">
                {field.foto ? "Alterar Foto" : "Selecionar Foto da Galeria"}
              </Text>
            </TouchableOpacity>
            {field.foto && (
              <Image
                source={{ uri: field.foto }}
                className="w-32 h-32 rounded-xl mt-2 align-self-center"
              />
            )}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#F9F7F3]"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="w-full bg-[#F9F7F3] flex pt-20 px-10 pb-16">
          <View className="flex gap-10">
            <View className="w-full flex items-center mb-8">
              <Image
                source={require("../../assets/petca-logo(laranja).png")}
                className="w-40 h-13 object-cover"
              />
            </View>
            <Text className="text-[2.5rem] font-semibold">
              Criar Nova Conta
            </Text>
          </View>

          <View className="gap-10">
            <View className="flex gap-5 mt-5">
              {formFields.map((field) => renderInput(field))}
            </View>
            <ButtonPrimary color="bg-[#F7A072]" onPress={handleSubmit}>
              Cadastrar-se
            </ButtonPrimary>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

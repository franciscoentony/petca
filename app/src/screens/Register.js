import { View, Text, ScrollView, Image, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";

import Input from "../components/Inputs/Input";
import ButtonPrimary from "../components/ButtonPrimary";
import DateInput from "../components/Inputs/DateInput";
import SelectInput from "../components/Inputs/SelectInput";

export default function Register() {
  // MODIFICADO: Criado um estado único em formato de objeto para gerenciar todos os inputs juntos de forma centralizada
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    dataNascimento: "",
    cep: "",
    estado: "",
    cidade: "",
    endereco: "",
    numero: "",
    atuacao: "",
    senha: "",
    confirmarSenha: ""
  });

  // Array de cada Input
  const listaAtuacao = [
    { label: "Colaborar Individual", value: "ColaborarIndividual" },
    { label: "ONG", value: "ong" },
  ];

  // Array de objetos que mapeia e centraliza as propriedades específicas de cada campo do formulário
  const formFields = [
    { type: "text", name: "nome", label: "Nome Completo", placeholder: "Digite seu nome", icon: "user" },
    { type: "text", name: "email", label: "Email", placeholder: "Digite seu Email", icon: "envelope", keyboardType: "email-address" },
    { type: "date", name: "dataNascimento", label: "Data de Nascimento" },
    { type: "text", name: "cep", label: "CEP", placeholder: "Digite CEP da sua cidade", icon: "location-crosshairs", keyboardType: "numeric" },
    { type: "text", name: "estado", label: "Estado", placeholder: "Digite seu Estado", icon: "building" },
    { type: "text", name: "cidade", label: "Cidade", placeholder: "Digite sua Cidade", icon: "city" },
    { type: "text", name: "endereco", label: "Endereço", placeholder: "Digite seu Endereço", icon: "location-dot" },
    { type: "text", name: "numero", label: "Número", placeholder: "Digite o Número", icon: "location-dot", keyboardType: "numeric" },
    { type: "select", name: "atuacao", label: "Atuação no Projeto", placeholder: "Qual será sua atuação?", options: listaAtuacao },
    { type: "text", name: "senha", label: "Senha", placeholder: "Digite sua Senha", icon: "lock", secureTextEntry: true },
    { type: "text", name: "confirmarSenha", label: "Confirmar Senha", placeholder: "Confirme sua Senha", icon: "lock", secureTextEntry: true },
  ];

  // Função handler dinâmica para atualizar o valor da chave correspondente dentro do estado formData
  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Disparar um alerta contendo a estrutura completa do objeto de dados atualizado
  const handleSubmit = () => {
    alert(JSON.stringify(formData, null, 2));
  };

  // Função condicional (switch) que renderiza o tipo exato de input baseado na propriedade 'type' do objeto
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
      case "date":
        return (
          <DateInput 
            key={field.name} 
            label={field.label} 
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
            <Text className="text-[2.5rem] font-semibold">Criar Nova Conta</Text>
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
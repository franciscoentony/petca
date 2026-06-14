import { useState } from 'react'
import { View, Text } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { MaskedTextInput } from "react-native-mask-text";

import { styled } from "nativewind"; 


const StyledMaskedTextInput = styled(MaskedTextInput);

export default function DateInput({ label }) {
    const [date, setDate] = useState('');
    
  return (
    <View className="w-full gap-1">
      <Text className="text-2xl">{label}</Text>
      <View className="relative justify-center">
        <FontAwesome6
          name="calendar"
          size={18}
          className="text-stone-400 absolute left-4 z-10"
        />

        <StyledMaskedTextInput
            mask="99/99/9999"
            placeholder="DD/MM/AAAA"
            keyboardType="numeric"
            value={date}
            onChangeText={(text) => setDate(text)}
            className="bg-stone-400/20 py-3 h-15 pl-12 text-xl rounded-2xl w-full"
        />
      </View>
    </View>
  );
}